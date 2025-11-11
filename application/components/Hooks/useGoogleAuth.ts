import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { Platform } from "react-native";

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "<YOUR_ANDROID_CLIENT_ID>",
    iosClientId: "<YOUR_IOS_CLIENT_ID>",
    clientId: "<YOUR_EXPO_CLIENT_ID>",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      fetch("http://<your-server-ip>:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: id_token }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.token) {
            await SecureStore.setItemAsync("userToken", data.token);
          }
        });
    }
  }, [response]);

  return { promptAsync, request };
};