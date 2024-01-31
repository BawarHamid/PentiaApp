import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CornerImg from "../../assets/images/CornerShape.png";
import PentiaLogo from "../../assets/images/LogoImgs/PentiaLogo.png";
import Colors from "../../constants/Colors";
import VectorIcon from "../../assets/icons/VectorIcons";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { defaultStyles, stylesLogin } from "../../constants/Styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../FirebaseConfig";
import Spinner from "react-native-loading-spinner-overlay";

import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomKeyBoardView from "../../components/keyboard-view/CustomKeyBoardView";
const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    setLoading(true);

    try {
      if (email !== "" && password !== "") {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login success");
        navigate("Home" as never);
      } else {
        Alert.alert("Login error", "Please provide both email and password.");
      }
    } catch (error: any) {
      Alert.alert("Login error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomKeyBoardView>
      <View className="absolute">
        <Animated.Image source={CornerImg} />
      </View>
      <View className="items-center justify-center gap-[10px] mt-28">
        <Text className="font-[Montserrat-Bold] text-lg text-black">
          Welcome back
        </Text>
        <Animated.Image
          source={PentiaLogo}
          className="w-36 h-36"
          entering={BounceIn}
          exiting={BounceOut}
        />
      </View>

      {/* form-view start */}
      <View className="mt-4 items-center">
        {/* input for email */}
        <View className="mt-3">
          <TextInput
            autoCapitalize="none"
            placeholder="Email address"
            placeholderTextColor={Colors["primary-medium-black"]}
            style={defaultStyles.inputField}
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </View>
        {/* input for password with on/off-hide */}
        <View className="mt-4">
          <TextInput
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={defaultStyles.inputField}
            // className={`${authTextInput} pl-8 font-[Montserrat-SemiBold]`}
            placeholder="Password"
            placeholderTextColor={Colors["primary-medium-black"]}
          />
          <VectorIcon
            type="Ionicons"
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color={Colors["primary-cyan"]}
            onPress={toggleShowPassword}
            style={styles.eyeIcon}
          />
        </View>
        <View className="mt-8">
          {/* login btn */}
          <TouchableOpacity
            disabled={!email || !password || (!email && !password)}
            style={defaultStyles.authBtn}
            className="active:bg-primary-cyan active:opacity-50"
            onPress={handleSignIn}
          >
            <Text className="text-white text-lg font-[Montserrat-SemiBold]">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-2 items-center">
          <TouchableOpacity
          // onPress={() => router.push("/(modals)/(public)/ResetPasswordModal")}
          >
            <Text className="font-[Montserrat-SemiBold] text-sm text-primary-cyan">
              Did you forget your password?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-1 items-center">
          <TouchableOpacity
          // onPress={() => router.push("/(modals)/(public)/ResetPasswordModal")}
          >
            <Text className="font-[Montserrat-SemiBold] text-sm text-primary-cyan">
              Register new account here
            </Text>
          </TouchableOpacity>
        </View>
        {/* View view separator and social login start */}
        <View style={[{ marginTop: 8 }, stylesLogin.viewSeparator]}>
          <View
            style={{
              flex: 1,
              borderBottomColor: "#000000",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Text style={stylesLogin.textSeparator}>or</Text>
          <View
            style={{
              flex: 1,
              borderBottomColor: "#000000",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>
        <View className="gap-3 items-center my-4">
          {/* btn for login with Google-account */}
          <TouchableOpacity
            style={defaultStyles.socialsBtn}
            // onPress={() => onSelectSocialAuth(Strategy.Facebook)}
          >
            <Text style={defaultStyles.socialsBtnText}>
              Continue with Google
            </Text>
            <VectorIcon
              type="Ionicons"
              name="logo-google"
              size={24}
              style={defaultStyles.socialBtnIcon}
              color="#4285F4"
            />
          </TouchableOpacity>
          {/* btn for login with Facebook-account */}
          <TouchableOpacity
            style={defaultStyles.socialsBtn}
            // onPress={() => onSelectSocialAuth(Strategy.Facebook)}
          >
            <Text style={defaultStyles.socialsBtnText}>
              Continue with Facebook
            </Text>
            <VectorIcon
              type="Ionicons"
              name="logo-facebook"
              size={24}
              style={defaultStyles.socialBtnIcon}
              color="#0866FF"
            />
          </TouchableOpacity>
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
    top: height * 0.018,
    // top: 14,
    right: 12,
    alignItems: "center",
  },
  onClickStyle: {},
});
