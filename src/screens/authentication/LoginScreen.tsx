import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CornerImg from "../../assets/images/CornerShape.png";
import PentiaLogo from "../../assets/images/LogoImgs/PentiaLogo.png";
import Colors from "../../utils/constants/Colors";
import VectorIcon from "../../assets/icons/VectorIcons";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { defaultStyles, stylesLogin } from "../../utils/constants/Styles";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomKeyBoardView from "../../components/generic/scrollviews/keyboard-view/CustomKeyBoardView";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../firebase/FirebaseConfig";
import AuthInput from "../../components/authentication/auth-input/AuthInput";
import SocialLoginButton from "../../components/authentication/social-login-buttons/SocialLoginButton";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/UserContext";
const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    // No empty fields
    if (!email.trim() || !password.trim()) {
      Alert.alert("Login Error", "Please fill in all fields.");
      return;
    }

    // email-format is getting checked
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Login Error", "Please enter a valid email address");
      return;
    }

    // Loading triggered
    setLoading(true);

    // Attempt to create user
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(() => {
        setLoading(false);
        // Navigate to next screen and show success message
        // Alert.alert("Success", "Login successful!");
      })
      // .then((userCred) => {
      //   if (userCred) {
      //     getDoc(doc(database, "users", userCred.user.uid)).then((docSnap) => {
      //       if (docSnap.exists()) {
      //         console.log("userLoginData", docSnap.data());
      //         setUser(docSnap.data());
      //       }
      //     });
      //   }
      //   setLoading(false);
      //   // Navigate to next screen and show success message
      //   Alert.alert("Success", "Login successful!");
      // })
      .catch((error) => {
        setLoading(false);
        // Error codes er fundet på nedestående sider
        //https://stackoverflow.com/questions/39152004/where-can-i-find-a-list-of-all-error-codes-and-messages-for-firebase-authenticat
        //https://firebase.google.com/docs/reference/js/auth.md#autherrorcodes
        let errorMessage = "Login failed. Please try again";
        if (error.code === "auth/invalid-credential") {
          errorMessage =
            "Your password is incorrect or this account doesn't exist";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Incorrect email";
        }
        Alert.alert("Registration Error", errorMessage);
      });
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
          gap: 16,
          marginTop: height * 0.15,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Bold",
            fontSize: 24,
            color: Colors["primary-black"],
          }}
        >
          Welcome back
        </Text>
        <Animated.Image
          source={PentiaLogo}
          // style={{ width: width * 0.33, height: height * 0.17 }}
          style={{ width: 144, height: 144 }}
          entering={BounceIn}
          exiting={BounceOut}
        />
      </View>

      {/* form-view start */}
      <View style={{ marginTop: height * 0.018 }}>
        <View style={{ alignItems: "center" }}>
          {/* input for email */}
          <View style={{ marginTop: height * 0.015 }}>
            <AuthInput
              changeCallback={setEmail}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email address"
              placeholderTextColor={Colors["primary-grey"]}
              style={[
                defaultStyles.inputField,
                { borderColor: Colors["primary-cyan"] },
              ]}
            />
          </View>
          {/* input for password with on/off-hide */}
          <View className="mt-4">
            <AuthInput
              changeCallback={setPassword}
              value={password}
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor={Colors["primary-grey"]}
              style={[
                defaultStyles.inputField,
                { borderColor: Colors["primary-cyan"] },
              ]}
              secureTextEntry={!showPassword}
              icon={
                <VectorIcon
                  type="Ionicons"
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color={Colors["primary-cyan"]}
                  onPress={toggleShowPassword}
                  style={styles.eyeIcon}
                />
              }
            />
          </View>
        </View>
        {/* forgot pass  */}
        <View style={{ marginTop: width * 0.05, paddingRight: width * 0.1 }}>
          <TouchableOpacity
          // onPress={() => navigtion.navigate("Forgot-Password" as never)}
          >
            <Text
              style={{
                fontFamily: "Montserrat-SemiBold",
                fontSize: 14,
                color: Colors["primary-cyan"],
                alignSelf: "flex-end",
              }}
            >
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
        {/* submit btn */}
        <View style={{ marginTop: height * 0.032, alignItems: "center" }}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors["primary-cyan"]} />
          ) : (
            <TouchableOpacity
              // disabled={!email || !password || (!email && !password)}
              style={defaultStyles.authBtn}
              className="active:bg-primary-cyan active:opacity-50"
              onPress={handleLogin}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 20,
                  fontFamily: "Montserrat-SemiBold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* route to register */}
        <View style={{ marginTop: width * 0.08 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register" as never)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat-SemiBold",
                  fontSize: 14,
                  color: Colors["primary-black"],
                }}
              >
                Don't have an account yet? {""}
              </Text>
              <Text
                style={{
                  fontFamily: "Montserrat-SemiBold",
                  fontSize: 14,
                  color: Colors["primary-cyan"],
                }}
              >
                Sign up here!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* View separator */}
        <View style={[stylesLogin.viewSeparator, { marginTop: height * 0.05 }]}>
          <View
            style={{
              flex: 1,
              borderBottomColor: "#000000",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Text style={stylesLogin.textSeparator}>Or continue with</Text>
          <View
            style={{
              flex: 1,
              borderBottomColor: "#000000",
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
            // onPress={() => onSelectSocialAuth(Strategy.Facebook)}
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
            // onPress={() => onSelectSocialAuth(Strategy.Facebook)}
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
    </CustomKeyBoardView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  eyeIcon: {
    position: "absolute",
    zIndex: 1,
    top: height * 0.017,
    // top: 14,
    right: 12,
    alignItems: "center",
  },
});
