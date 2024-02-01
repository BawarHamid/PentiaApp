import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CornerImg from "../../assets/images/CornerShape.png";
import PentiaLogo from "../../assets/images/LogoImgs/PentiaLogo.png";
import Colors from "../../constants/Colors";
import VectorIcon from "../../assets/icons/VectorIcons";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { defaultStyles, stylesLogin } from "../../constants/Styles";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomKeyBoardView from "../../components/keyboard-view/CustomKeyBoardView";
const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigtion = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        console.log("Login success");
        // navigtion.navigate("ChatRoom" as never);
      } else {
        Alert.alert("Login error", "Please provide both email and password.");
      }
    } catch (error: any) {
      Alert.alert("Login error", error);
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
            <TextInput
              autoCapitalize="none"
              placeholder="Email address"
              placeholderTextColor={Colors["primary-grey"]}
              style={[
                defaultStyles.inputField,
                { borderColor: Colors["primary-cyan"] },
              ]}
              className="focus:border-2"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>
          {/* input for password with on/off-hide */}
          <View className="mt-4">
            <TextInput
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={[
                defaultStyles.inputField,
                { borderColor: Colors["primary-cyan"] },
              ]}
              className="focus:border-2"
              placeholder="Password"
              placeholderTextColor={Colors["primary-grey"]}
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
            onPress={() => navigtion.navigate("Register" as never)}
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
          <TouchableOpacity
            style={defaultStyles.socialsBtnSmall}
            // onPress={() => onSelectSocialAuth(Strategy.Facebook)}
          >
            <VectorIcon
              type="Ionicons"
              name="logo-google"
              size={24}
              style={defaultStyles.socialBtnSmallIcon}
              color="#4285F4"
            />
          </TouchableOpacity>
          {/* btn for login with Facebook-account */}
          <TouchableOpacity
            style={defaultStyles.socialsBtnSmall}
            // onPress={() => onSelectSocialAuth(Strategy.Facebook)}
          >
            <VectorIcon
              type="Ionicons"
              name="logo-facebook"
              size={24}
              style={defaultStyles.socialBtnSmallIcon}
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
    top: height * 0.017,
    // top: 14,
    right: 12,
    alignItems: "center",
  },
});
