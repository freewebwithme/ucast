import React from "react";
import { Platform, View } from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import * as AppAuth from "expo-app-auth";
import { useNavigation } from "react-navigation-hooks";

const SIGN_IN_GOOGLE = gql`
  mutation($idToken: String!, $name: String!, $avatarUrl: String!) {
    googleSignIn(idToken: $idToken, name: $name, avatarUrl: $avatarUrl) {
      token
      user {
        email
        name
        providerName
        providerId
        avatarUrl
      }
    }
  }
`;

export function GoogleLoginButton(props) {
  const { navigate } = useNavigation();
  const [sign_in_google, { loading, error }] = useMutation(SIGN_IN_GOOGLE, {
    async onCompleted(data) {
      console.log("Printing data: ", data);
      if (data) {
        /* Put token in storage */
        await SecureStore.setItemAsync("userToken", data.googleSignIn.token);
        navigate("Main");
      } else {
        console.log("no data");
        props.onError("로그인 도중에 문제가 발생했습니다. 다시 시도하세요");
      }
    }
  });

  if (error) {
    console.log("Printing error: " + `${error}`);
    props.onError("로그인 도중에 문제가 발생했습니다. 다시 시도하세요");
  }

  return (
    <View>
      <Button
        mode="contained"
        icon="google"
        onPress={async () => {
          /* Check if sign in */
          const authState = await getCachedAuthAsync();
          if (authState) {
            console.log("onPress(): authState exists");
            // Token expiration is checked by getCachedAuthAsync function
            /* You have idToken then send idToken to backend server to log in */
            /* Decode a user info and get back with user and token */
            // Get a user detail...
            const userInfo_result = await SecureStore.getItemAsync("userInfo");
            const userInfo = JSON.parse(userInfo_result);
            console.log("Printing userInfo: ", userInfo);
            sign_in_google({
              variables: {
                idToken: authState.idToken,
                name: userInfo.name,
                avatarUrl: userInfo.picture
              }
            });
          } else {
            console.log("onPress(): no authState");
            /* Get a new Auth from google */

            const result = await signInAsync();
            console.log("onPress(): signInAsync(): result: ", result);
            if (result.type === "success") {
              console.log("Login Successful!, Do what you have to do ");
              /* You have idToken then send idToken to backend server to log in */
              /* It could be first time,, or re-login process
               * Decode idToken in backend server and check if user is exist with email and id
               * If there is a record, update idToken in database and return with user and token
               * If there is no record, create a new user with info and return with user and token*/

              const userInfo_result = await SecureStore.getItemAsync(
                "userInfo"
              );
              const userInfo = JSON.parse(userInfo_result);
              sign_in_google({
                variables: {
                  idToken: result.authState.idToken,
                  name: userInfo.name,
                  avatarUrl: userInfo.picture
                }
              });
            } else if (result.type === "cancel") {
              props.onError("로그인을 취소하셨습니다.");
            } else {
              props.onError(
                "로그인 도중에 문제가 발생했습니다. 다시 시도하세요."
              );
            }
          }
        }}
        style={{ width: 250, backgroundColor: "#4285F4" }}
      >
        Gmail로 접속하기
      </Button>
      <Button
        mode="contained"
        disabled={!hasAuthToken()}
        onPress={async () => {
          const value = await SecureStore.getItemAsync("authState");
          const authState = JSON.parse(value);
          await signOutAsync(authState);
          alert("You are signed out");
        }}
      >
        {" "}
        Sign out
      </Button>
      <Button
        mode="contained"
        disabled={!hasAuthToken()}
        onPress={async () => {
          const value = await SecureStore.getItemAsync("authState");
          const authState = JSON.parse(value);
          const result = makeExpire(authState);
          console.log("Make expire", result);
          alert("Expired");
        }}
      >
        Expire!
      </Button>
    </View>
  );
}

const config = {
  issuer: "https://accounts.google.com",
  scopes: ["profile", "email"],
  clientId:
    Platform.OS === "ios"
      ? Constants.manifest.extra.iosClientId
      : Constants.manifest.extra.androidClientId
};

async function signInAsync() {
  try {
    console.log("signInAsync(): Getting auth from google....");
    const authState = await AppAuth.authAsync(config);
    console.log("signInAsync(): Printing authState:", authState);

    console.log("signInAsync(): Saving authState...");
    await cacheAuthAsync(authState);

    console.log("signInAsync(): Saving refreshToken");
    await cacheRefreshTokenAsync(authState.refreshToken);

    /* Get a user detail again with new access token */

    const userInfo = await fetchUserInfo(authState);
    console.log("Fetched new user detail: ", userInfo);
    console.log("Saving refreshed user info to storage...");
    await cacheUserInfoAsync(userInfo);

    return { type: "success", authState: authState };
  } catch (error) {
    if (error.message.toLowerCase().indexOf("user cancelled") > -1) {
      return { type: "cancel" };
    }
  }
}

async function fetchUserInfo({ accessToken }) {
  const userInfoResponse = await fetch(
    "https://www.googleapis.com/userinfo/v2/me",
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );
  const userInfo = await userInfoResponse.json();
  console.log("fetchUserInfo(): Printing User info: ", userInfo);
  return userInfo;
}

async function cacheAuthAsync(authState) {
  return await SecureStore.setItemAsync("authState", JSON.stringify(authState));
}

async function cacheUserInfoAsync(userInfo) {
  return await SecureStore.setItemAsync("userInfo", JSON.stringify(userInfo));
}

async function cacheRefreshTokenAsync(refreshToken) {
  return await SecureStore.setItemAsync("refreshToken", refreshToken);
}

/* Before we start our app, we should check to see if a user is signed-in or not */
async function getCachedAuthAsync() {
  /* First we will try and get the cached auth */
  const value = await SecureStore.getItemAsync("authState");
  /* SecureStore saves data as strings, we should parse our data back into a JSON */
  const authState = JSON.parse(value);
  if (authState) {
    /* If our data exsits, than we should see if it's expired */
    if (checkIfTokenExpired(authState)) {
      /* the session has expired
       * Let's try and refresh it using the refresh token.
       */
      console.log(
        "getCachedAuthAsync(): Token has expired.  Refreshing token..."
      );
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      console.log(
        "getCachedAuthAsync(): Printing refresh token: ",
        refreshToken
      );
      const result = await refreshAuthAsync(refreshToken);

      if (result.type === "success") {
        return result.authState;
      } else {
        return null;
      }
    } else {
      return authState;
    }
  }
  return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

function makeExpire(authState) {
  authState.accessTokenExpirationDate = new Date(3599);
  const authState_json = JSON.stringify(authState);
  SecureStore.setItemAsync("authState", authState_json);
  return authState;
}

/* Testing this method */
async function refreshAuthAsyncUsingFetch(refreshToken) {
  const requestOptions = {
    method: "POST",
    redirect: "follow"
  };

  fetch(
    `https://oauth2.googleapis.com/token?client_id=${
      Platform.OS === "ios"
        ? Constants.manifest.extra.iosClientId
        : Constants.manifest.extra.androidClientId
    }&refresh_token=${refreshToken}&grant_type=refresh_token`,
    requestOptions
  )
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log("error", error));

  // console.log("refreshAuthAsyncUsingFetch():", refreshTokenResult);
}
async function refreshAuthAsync(refreshToken) {
  try {
    console.log("refreshAuthAsync(): Trying to refresh token...");
    const authState = await AppAuth.refreshAsync(config, refreshToken);
    /* Get a user detail again with new access token */

    const userInfo = await fetchUserInfo(authState);
    console.log("Fetched new user detail: ", userInfo);
    console.log("Saving refreshed user info to storage...");
    await cacheUserInfoAsync(userInfo);

    console.log(
      "refreshAuthAsync(): Refreshing token completed. Saving authState...Here is new authState",
      authState
    );

    await cacheAuthAsync(authState);

    return { type: "success", authState: authState };
  } catch (message) {
    return { type: "fail", message: message };
  }
}

async function hasAuthToken() {
  const result = await getCachedAuthAsync();
  const result2 = result ? false : true;
  return result2;
}
/* To sign out we want to revoke our tokens.
 * This is what high level auth solutions like FBSDK are doing behind the scenes.
 */
async function signOutAsync({ accessToken }) {
  try {
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true
    });
    /* We are removing the cached tokens so we can check on our auth state later.
     * No tokens = Not signed-In
     */
    console.log("Deleting authState from storage...");
    await SecureStore.deleteItemAsync("authState");
    console.log("Deleting userInfo from storage...");
    await SecureStore.deleteItemAsync("userInfo");
    return null;
  } catch ({ message }) {
    alert(`Failed to revoke token: ${message}`);
  }
}
