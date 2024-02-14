import { View, Text, StyleSheet, Button, Alert } from "react-native";
import Colors from "../../utils/constants/Colors";
import VectorIcon from "../../assets/icons/VectorIcons";
import { defaultStyles, stylesLogin } from "../../utils/constants/Styles";
import { Dimensions } from "react-native";
import SocialLoginButton from "../../components/authentication/social-login-buttons/SocialLoginButton";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const { width, height } = Dimensions.get("window");
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { useEffect } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth, database } from "../../firebase/FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";

// everything this page:
// https://rnfirebase.io/auth/social-auth

const SocialLoginForm = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "830333589171-s2u18mfr5mbr7h5h7o4e5u9nh6vj4f9o.apps.googleusercontent.com",
    });
  }, []);

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCred = await signInWithCredential(auth, googleCredential);

      // Create a user document in Firestore
      const userData = {
        username: userCred.user.displayName,
        email: userCred.user.email,
        userId: userCred.user.uid,
        profile_picture: userCred.user.photoURL,
      };
      await setDoc(doc(database, "users", userCred.user.uid), userData);
    } catch (error) {
      console.log("Google error", error);
      Alert.alert(String(error));
    }
  };

  // Function to handle Facebook login
  const handleFacebookLogin = async () => {
    try {
      // Attempt login with permissions
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

      // Create a Facebook credential with the AccessToken
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken
      );

      // Sign-in the user with the credential
      const userCred = await signInWithCredential(auth, facebookCredential);

      // Create a user document in Firestore
      const userData = {
        username: userCred.user.displayName,
        email: userCred.user.email,
        userId: userCred.user.uid,
        profile_picture: userCred.user.photoURL,
      };
      await setDoc(doc(database, "users", userCred.user.uid), userData);
    } catch (error) {
      console.log("Facebook error", error);
      Alert.alert(String(error));
    }
  };

  return (
    <View>
      {/* View separator */}
      <View style={[stylesLogin.viewSeparator, { marginTop: height * 0.04 }]}>
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
