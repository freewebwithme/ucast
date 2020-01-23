import { AuthSession } from "expo";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";

async function handleInstagramLoginAsync() {
  const redirectUrl = AuthSession.getRedirectUrl();
  console.log("Printing Redirect URL: " + `${redirectUrl}`);
  const result = await AuthSession.startAsync({
    authUrl:
      `https://api.instagram.com/oauth/authorize/?client_id=${Constants.manifest.extra.instagramAppId}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&response_type=code` +
      `&scope=user_profile`
  });
  console.log("Printing result: " + `${result.params.code};`);
  consoel.log("Printing Result: "+ `${result}`);
  return result;
}

export function InstagramLoginButton() {
  const [token, setToken] = useState("");
  return (
    <View>
      <Button
        mode="contained"
        icon="instagram"
        style={{ width: 250, marginBottom: 10 }}
        onPress={() => {
          const result = handleInstagramLoginAsync();
          setToken({ result });
        }}
      >
        Instagram으로 접속하기
      </Button>
      {token ? <Text>{JSON.stringify(token)}</Text> : null}
    </View>
  );
}

