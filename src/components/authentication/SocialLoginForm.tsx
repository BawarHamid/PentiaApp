import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import CornerImgWhite from "../../assets/images/CornerShapeLight.png";
import PentiaLight from "../../assets/images/LogoImgs/PentiaLight.png";
import Colors from "../../utils/constants/Colors";
import VectorIcon from "../../assets/icons/VectorIcons";
import Animated, {
  BounceIn,
  BounceInRight,
  BounceOut,
} from "react-native-reanimated";
import { defaultStyles, stylesLogin } from "../../utils/constants/Styles";
import { Dimensions } from "react-native";
// import { auth } from "../../firebase/FirebaseConfig";
import SocialLoginButton from "../../components/authentication/social-login-buttons/SocialLoginButton";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const { width, height } = Dimensions.get("window");
import auth from "@react-native-firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

const SocialLoginForm = () => {
  GoogleSignin.configure({
    webClientId:
      "830333589171-s2u18mfr5mbr7h5h7o4e5u9nh6vj4f9o.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  const handleGoogleLogin = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle Facebook login
  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      if (result.isCancelled) {
        throw "User cancelled the login process";
      }
      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw "Something went wrong obtaining access token";
      }
      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );
      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log("Facebook login error:", error);
    }
  };

  return (
    <View>
      {/* View separator */}
      <View style={[stylesLogin.viewSeparator, { marginTop: height * 0.05 }]}>
        <View
          style={{
            flex: 1,
            borderBottomColor: Colors["primary-white"],
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={stylesLogin.textSeparator}>Or continue with</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: Colors["primary-white"],
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      {/* social login */}
      <View
        style={{
          gap: 12,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: height * 0.04,
          flexDirection: "row",
        }}
      >
        {/* btn for login with Google-account */}
        <SocialLoginButton
          onPress={handleGoogleLogin}
          style={defaultStyles.socialsBtnSmall}
          icon={
            <VectorIcon
              type="Ionicons"
              name="logo-google"
              size={24}
              style={defaultStyles.socialBtnSmallIcon}
              color="#4285F4"
            />
          }
        />

        {/* btn for login with Facebook-account */}
        <SocialLoginButton
          onPress={handleFacebookLogin}
          style={defaultStyles.socialsBtnSmall}
          icon={
            <VectorIcon
              type="Ionicons"
              name="logo-facebook"
              size={24}
              style={defaultStyles.socialBtnSmallIcon}
              color="#0866FF"
            />
          }
        />
      </View>
    </View>
  );
};

export default SocialLoginForm;
