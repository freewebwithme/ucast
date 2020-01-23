import * as Facebook from "expo-facebook";
import React from "react";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const SIGN_UP_FACEBOOK = gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
    $providerName: String!
    $avatarUrl: String!
    $providerId: String!
  ) {
    signupOauth(
      name: $name
      email: $email
      password: $password
      providerName: $providerName
      avatarUrl: $avatarUrl
      providerId: $providerId
    ) {
      token
      user {
        email
        name
      }
    }
  }
`;

export function FacebookLoginButton(props) {
  const [sign_in_fb, {loading, error}] = useMutation(SIGN_UP_FACEBOOK, {
    onCompleted(data) {
      console.log("Printing Data: " + `${data.signupOauth.token}`);
      console.log("Printing Data: " + `${data.signupOauth.user.email}`);

    }
  });

  if (error) props.onError("로그인 도중에 문제가 발생했습니다. 다시 시도하세요");

  return (
    <Button
      mode="contained"
      icon="facebook"
      onPress={async () => {
        try {
          await Facebook.initializeAsync(
            Constants.manifest.extra.facebookAppId
          );
          const {
            type,
            token,
            expires,
            permissions,
            declinePermissions
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ["public_profile", "email"]
          });
          if (type === "success") {
            console.log("Printing token: " + `${token}`);
            console.log("Printing token expires: " + `${expires}`);
            // Saving facebook's token and expiry date(unixtime)
            SecureStore.setItemAsync("oAuthToken", token);
            SecureStore.setItemAsync("oAuthTokenExpiry", expires.toString());

            await fetch(
              `https://graph.facebook.com/me?fields=name,email,picture&access_token=${token}`
            )
              .then(response => {
                return response.json();
              })
              .then(result_json => {
                console.log(result_json);
                // Request server to sign up using user's information
		sign_in_fb({
		  variables: {
		    name: result_json.name,
		    email: result_json.email,
		    providerName: "facebook",
		    avatarUrl: result_json.picture.data.url,
		    providerId: result_json.id, 
		    password: token
		  }
		})
              });
          } else {
            console.log("Cancelled");
            // onError is setError from parent(LandingScreen).
            props.onError("로그인을 취소했습니다");
          }
        } catch ({ message }) {
          console.log("Printing Error:" + `${message}`);
          props.onError("로그인 도중에 문제가 발생했습니다. 다시 시도하세요");
        }
      }}
      style={{ width: 250, marginBottom: 10, backgroundColor: "#3897F0" }}
    >
      Facebook으로 접속하기
    </Button>
  );
}
