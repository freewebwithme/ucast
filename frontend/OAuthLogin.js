import * as Facebook from "expo-facebook";

export async function facebookLoginAsync() {
  const facebook_App_Id = "1320283904809725";
  try {
    await Facebook.initializeAsync(facebook_App_Id);
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
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      const result = await response.json();
      console.log("Printing result: " + result);
      console.log("Logged in!:" + `${(await response.json()).picture}!`);
    } else {
      console.log("Cancelled");
    }
  } catch ({ message }) {
    console.log("Printing Error:" + `${message}`);
  }
}
