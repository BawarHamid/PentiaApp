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
import CustomKeyBoardView from "../../components/keyboard-view/CustomKeyBoardView";
import { useAuth } from "../../context/UserContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, database } from "../../firebase/FirebaseConfig";
import AuthInput from "../../components/authentication/auth-input/AuthInput";
import SocialLoginButton from "../../components/authentication/social-login-buttons/SocialLoginButton";
const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigtion = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    // No empty fields
    if (!email.trim() || !password.trim() || !username.trim()) {
      Alert.alert("Registration Error", "Please fill in all fields.");
      return;
    }

    // email-format is getting checked
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Registration Error", "Please enter a valid email address.");
      return;
    }

    // Loading triggered
    setLoading(true);

    // Attempt to create user
    createUserWithEmailAndPassword(auth, email.trim(), password)
      .then((userCred) => {
        const userData = {
          username: username.trim(),
          userId: userCred.user.uid,
        };
        return setDoc(doc(database, "users", userCred.user.uid), userData);
      })
      .then(() => {
        setLoading(false);
        // Navigate to next screen or show success message
        Alert.alert("Success", "Registration successful!");
      })
      .catch((error) => {
        setLoading(false);

        // Error codes er fundet på nedestående sider
        //https://stackoverflow.com/questions/39152004/where-can-i-find-a-list-of-all-error-codes-and-messages-for-firebase-authenticat
        //https://firebase.google.com/docs/reference/js/auth.md#autherrorcodes
        let errorMessage = "Registration failed. Please try again";
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "The email address is already in use";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "The password is too weak";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "The email address is not valid";
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
          gap: 10,
          marginTop: height * 0.15,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Bold",
            fontSize: 18,
            color: Colors["primary-black"],
          }}
        >
          Welcome to Chat Chat
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat-Medium",
            fontSize: 14,
            color: Colors["primary-medium-black"],
          }}
        >
          Let's create an account together!
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
      <View style={{ marginTop: height * 0.01 }}>
        <View style={{ alignItems: "center" }}>
          {/* input for username */}
          <View style={{ marginTop: height * 0.015 }}>
            <AuthInput
              changeCallback={setUsername}
              value={username}
              autoCapitalize="none"
              placeholder="Username"
              placeholderTextColor={Colors["primary-grey"]}
              style={[
                defaultStyles.inputField,
                { borderColor: Colors["primary-cyan"] },
              ]}
            />
          </View>
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
          <View style={{ marginTop: height * 0.015 }}>
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
        {/* submit btn */}
        <View style={{ marginTop: height * 0.032, alignItems: "center" }}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors["primary-cyan"]} />
          ) : (
            <TouchableOpacity
              // disabled={!email || !password || (!email && !password)}
              style={defaultStyles.authBtn}
              className="active:bg-primary-cyan active:opacity-50"
              onPress={handleRegister}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 20,
                  fontFamily: "Montserrat-SemiBold",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* route to login */}
        <View style={{ marginTop: width * 0.08 }}>
          <TouchableOpacity
            onPress={() => navigtion.navigate("Login" as never)}
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
                Already have an account? {""}
              </Text>
              <Text
                style={{
                  fontFamily: "Montserrat-SemiBold",
                  fontSize: 14,
                  color: Colors["primary-cyan"],
                }}
              >
                Sign in here!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* View separator */}
        <View style={[stylesLogin.viewSeparator, { marginTop: height * 0.03 }]}>
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
        {/* social btns */}
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

export default RegisterScreen;

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
