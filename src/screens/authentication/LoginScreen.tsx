import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CornerImg from "../../assets/images/CornerLight.png";
import PentiaLight from "../../assets/images/LogoImgs/PentiaLight.png";
import Colors from "../../utils/constants/Colors";
import VectorIcon from "../../assets/icons/VectorIcons";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { defaultStyles } from "../../utils/constants/Styles";
import { useNavigation } from "@react-navigation/native";
import CustomKeyBoardView from "../../components/keyboard-view/CustomKeyBoardView";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import AuthInput from "../../components/authentication/auth-input/AuthInput";
import LottieView from "lottie-react-native";
import normalize from "react-native-normalize";

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
    try {
      // No empty fields
      if (!email.trim() || !password.trim()) {
        Alert.alert("Login Error", "Please fill in all fields.");
        return;
      }

      // email-format is getting checked
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        Alert.alert("Login Error", "Please enter a valid email address");
        setEmail("");
        return;
      }

      // Loading triggered
      setLoading(true);

      // Attempt to create user
      signInWithEmailAndPassword(auth, email.trim(), password)
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          // Error codes er fundet på nedestående sider
          //https://stackoverflow.com/questions/39152004/where-can-i-find-a-list-of-all-error-codes-and-messages-for-firebase-authenticat
          //https://firebase.google.com/docs/reference/js/auth.md#autherrorcodes
          let errorMessage = "Login failed. Please try again";
          if (error.code === "auth/invalid-credential") {
            errorMessage =
              "Your password is incorrect or this account doesn't exist. Please try again";
            setEmail("");
            setPassword("");
          } else if (error.code === "auth/wrong-password") {
            errorMessage = "Incorrect password";
            setPassword("");
          } else if (error.code === "auth/invalid-email") {
            errorMessage = "Incorrect email";
            setEmail("");
          }
          Alert.alert("Login Error", errorMessage);
        });
    } catch (error) {
      Alert.alert("Login Error", String(error));
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
          gap: 16,
          marginTop: normalize(145),
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Bold",
            fontSize: normalize(25),
            color: Colors["primary-yellow"],
          }}
        >
          Welcome back
        </Text>
        <Animated.Image
          source={PentiaLight}
          style={{ width: normalize(142), height: normalize(142) }}
          entering={BounceIn}
          exiting={BounceOut}
        />
      </View>

      {/* form-view start */}
      <View style={{ marginTop: normalize(18) }}>
        <View style={{ alignItems: "center" }}>
          {/* input for email */}
          <View>
            <AuthInput
              changeCallback={setEmail}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email address"
              placeholderTextColor={Colors["primary-medium-grey"]}
              style={[
                defaultStyles.inputField,
                { borderColor: Colors["primary-border"] },
              ]}
            />
          </View>
          {/* input for password with on/off-hide */}
          <View style={{ marginTop: normalize(18) }}>
            <AuthInput
              changeCallback={setPassword}
              value={password}
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor={Colors["primary-medium-grey"]}
              style={[
                defaultStyles.inputField,
                { borderColor: Colors["primary-border"] },
              ]}
              secureTextEntry={!showPassword}
              icon={
                <VectorIcon
                  type="Ionicons"
                  name={showPassword ? "eye" : "eye-off"}
                  size={normalize(25)}
                  color={Colors["primary-black"]}
                  onPress={toggleShowPassword}
                  style={styles.eyeIcon}
                />
              }
            />
          </View>
        </View>
        {/* forgot pass  */}
        <View style={{ marginTop: normalize(20), paddingRight: normalize(42) }}>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "Montserrat-SemiBold",
                fontSize: normalize(15),
                color: Colors["primary-yellow"],
                alignSelf: "flex-end",
              }}
            >
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
        {/* submit btn */}
        <View style={{ marginTop: normalize(26), alignItems: "center" }}>
          {loading ? (
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
          ) : (
            <TouchableOpacity
              style={defaultStyles.authBtn}
              className="active:bg-primary-yellow active:opacity-50"
              onPress={handleLogin}
            >
              <Text
                style={{
                  color: Colors["primary-black"],
                  fontSize: normalize(21),
                  fontFamily: "Montserrat-SemiBold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <View></View>
        ) : (
          <View>
            {/* route to register */}

            <View style={{ marginTop: normalize(18) }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("register" as never)}
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
                      fontSize: normalize(15),
                      color: Colors["primary-white"],
                    }}
                  >
                    Don't have an account yet? {""}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: normalize(15),
                      color: Colors["primary-yellow"],
                    }}
                  >
                    Sign up here!
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* route to social auth */}
            <View
              style={{
                alignItems: "center",
                marginVertical: normalize(40),
              }}
            >
              <TouchableOpacity
                style={[
                  defaultStyles.authOutlineBtn,
                  { height: normalize(55) },
                ]}
                onPress={() => navigation.navigate("social-login" as never)}
                className="active:bg-primary-yellow active:opacity-50"
              >
                <Text
                  style={{
                    fontFamily: "Montserrat-SemiBold",
                    fontSize: normalize(15),
                    color: Colors["primary-black"],
                  }}
                >
                  Login with Social Networks
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </CustomKeyBoardView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  eyeIcon: {
    position: "absolute",
    zIndex: 1,
    top: normalize(18),
    right: normalize(14),
    alignItems: "center",
  },
});
