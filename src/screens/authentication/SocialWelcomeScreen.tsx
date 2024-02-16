import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CornerImg from "../../assets/images/CornerLight.png";
import Hero from "../../assets/images/welcomeHero.png";
import Colors from "../../utils/constants/Colors";
import VectorIcon from "../../assets/icons/VectorIcons";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { defaultStyles, stylesLogin } from "../../utils/constants/Styles";
import { useNavigation } from "@react-navigation/native";
import CustomKeyBoardView from "../../components/keyboard-view/CustomKeyBoardView";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth, database } from "../../firebase/FirebaseConfig";
import LottieView from "lottie-react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { doc, setDoc } from "firebase/firestore";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import SocialLoginButton from "../../components/authentication/social-login-buttons/SocialLoginButton";
import normalize from "react-native-normalize";

const SocialWelcomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "830333589171-s2u18mfr5mbr7h5h7o4e5u9nh6vj4f9o.apps.googleusercontent.com",
    });
  }, []);

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Loading triggered
      setLoading(true);
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      signInWithCredential(auth, googleCredential)
        .then((userCred) => {
          const userData = {
            username: userCred.user.displayName,
            email: userCred.user.email,
            userId: userCred.user.uid,
            profile_picture: userCred.user.photoURL,
          };
          return setDoc(doc(database, "users", userCred.user.uid), userData);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          // Error codes er fundet på nedestående sider
          //https://stackoverflow.com/questions/39152004/where-can-i-find-a-list-of-all-error-codes-and-messages-for-firebase-authenticat
          //https://firebase.google.com/docs/reference/js/auth.md#autherrorcodes
          let errorMessage = "Google Login failed. Please try again";
          if (error.code === "auth/invalid-credential") {
            errorMessage =
              "There was a problem signing in with your Google Account. Please try again.";
          } else if (
            error.code === "auth/account-exists-with-different-credential"
          ) {
            errorMessage =
              "An account already exists with the same email address but different sign-in method. Please sign in using the correct method.";
          } else if (error.code === "auth/user-disabled") {
            errorMessage =
              "Your account has been disabled. Please contact support for assistance.";
          } else if (error.code === "auth/network-request-failed") {
            errorMessage =
              "Network error. Please check your internet connection and try again.";
          } else if (error.code === "auth/popup-closed-by-user") {
            errorMessage = "Sign-in process was canceled. Please try again.";
          }
          Alert.alert("Google Login Error", errorMessage);
        });
    } catch (error) {
      setLoading(false);
      console.log("Google error", error);
      Alert.alert(String(error));
    }
  };

  // Function to handle Facebook login
  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        // setLoading(false);
        throw "User cancelled the login process";
      }

      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // setLoading(false);
        throw "Something went wrong obtaining access token";
      }

      // Create a Facebook credential with the AccessToken
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken
      );

      // Sign-in the user with the credential
      signInWithCredential(auth, facebookCredential)
        .then((userCred) => {
          const userData = {
            username: userCred.user.displayName,
            email: userCred.user.email,
            userId: userCred.user.uid,
            profile_picture: userCred.user.photoURL,
          };
          return setDoc(doc(database, "users", userCred.user.uid), userData);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          // Error codes er fundet på nedestående sider
          //https://stackoverflow.com/questions/39152004/where-can-i-find-a-list-of-all-error-codes-and-messages-for-firebase-authenticat
          //https://firebase.google.com/docs/reference/js/auth.md#autherrorcodes
          let errorMessage = "Google Login failed. Please try again";
          if (error.code === "auth/invalid-credential") {
            errorMessage =
              "There was a problem signing in with your Google Account. Please try again.";
          } else if (
            error.code === "auth/account-exists-with-different-credential"
          ) {
            errorMessage =
              "An account already exists with the same email address but different sign-in method. Please sign in using the correct method.";
          } else if (error.code === "auth/user-disabled") {
            errorMessage =
              "Your account has been disabled. Please contact support for assistance.";
          } else if (error.code === "auth/network-request-failed") {
            errorMessage =
              "Network error. Please check your internet connection and try again.";
          } else if (error.code === "auth/popup-closed-by-user") {
            errorMessage = "Sign-in process was canceled. Please try again.";
          }
          Alert.alert("Google Login Error", errorMessage);
        });
    } catch (error) {
      setLoading(false);
      console.log("Google error", error);
      Alert.alert(String(error));
    }
  };

  return (
    <CustomKeyBoardView>
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Animated.Image source={CornerImg} />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: normalize(16),
          marginTop: normalize(150),
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Bold",
            fontSize: normalize(25),
            color: Colors["primary-yellow"],
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat-Bold",
            fontSize: normalize(16),
            color: Colors["primary-white"],
            paddingHorizontal: normalize(40),
            textAlign: "center",
          }}
        >
          Please login or register to continue using Chat Chat
        </Text>
        <Animated.Image
          source={Hero}
          style={{ width: normalize(279), height: normalize(225) }}
          entering={BounceIn}
          exiting={BounceOut}
        />
      </View>

      {/* form-view start */}
      <View style={{ marginTop: normalize(16) }}>
        {loading ? (
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                marginTop: normalize(25),
              },
            ]}
          >
            <LottieView
              source={require("../../assets/Animations/Loadings/LoadingAnimation1.json")}
              autoPlay
              loop
              resizeMode="cover"
              style={{
                width: normalize(120),
                height: normalize(120),
              }}
            />
          </View>
        ) : (
          <>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Montserrat-SemiBold",
                  color: Colors["primary-yellow"],
                  fontSize: normalize(16),
                }}
              >
                Enter via Social Networks
              </Text>
            </View>
            {/* social login */}
            <View
              style={{
                gap: normalize(12),
                alignItems: "center",
                justifyContent: "center",
                marginVertical: normalize(25),
                flexDirection: "row",
              }}
            >
              {/* btn for login with Google-account */}
              <SocialLoginButton
                onPress={handleGoogleLogin}
                style={defaultStyles.socialsBtnRounded}
                icon={
                  <VectorIcon
                    type="Ionicons"
                    name="logo-google"
                    size={normalize(30)}
                    style={defaultStyles.socialBtnSmallIcon}
                    color="#4285F4"
                  />
                }
              />

              {/* btn for login with Facebook-account */}
              <SocialLoginButton
                onPress={handleFacebookLogin}
                style={defaultStyles.socialsBtnRounded}
                icon={
                  <VectorIcon
                    type="Ionicons"
                    name="logo-facebook"
                    size={normalize(30)}
                    style={defaultStyles.socialBtnSmallIcon}
                    color="#0866FF"
                  />
                }
              />
            </View>
            <View style={[stylesLogin.viewSeparator]}>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: Colors["primary-white"],
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
              <Text style={stylesLogin.textSeparator}>
                Or continue with email?
              </Text>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: Colors["primary-white"],
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            </View>
            <View>
              <View
                style={{
                  alignItems: "center",
                  marginTop: normalize(20),
                  gap: normalize(14),
                }}
              >
                <TouchableOpacity
                  style={defaultStyles.authOutlineBtn}
                  onPress={() => navigation.navigate("login" as never)}
                  className="active:bg-primary-yellow active:opacity-50"
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: normalize(16),
                      color: Colors["primary-black"],
                    }}
                  >
                    Login with existing account here
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={defaultStyles.authOutlineBtn}
                  onPress={() => navigation.navigate("register" as never)}
                  className="active:bg-primary-yellow active:opacity-50"
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: normalize(16),
                      color: Colors["primary-black"],
                    }}
                  >
                    Register new account here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </CustomKeyBoardView>
  );
};

export default SocialWelcomeScreen;
