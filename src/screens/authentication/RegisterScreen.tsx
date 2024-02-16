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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, database } from "../../firebase/FirebaseConfig";
import AuthInput from "../../components/authentication/auth-input/AuthInput";
import LottieView from "lottie-react-native";
import normalize from "react-native-normalize";

const RegisterScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    try {
      // No empty fields
      if (!email.trim() || !password.trim() || !username.trim()) {
        Alert.alert("Registration Error", "Please fill in all fields.");
        return;
      }

      // email-format is getting checked
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        Alert.alert(
          "Registration Error",
          "Please enter a valid email address."
        );
        setEmail("");
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
        })
        .catch((error) => {
          setLoading(false);
          // Error codes er fundet på nedestående sider
          //https://stackoverflow.com/questions/39152004/where-can-i-find-a-list-of-all-error-codes-and-messages-for-firebase-authenticat
          //https://firebase.google.com/docs/reference/js/auth.md#autherrorcodes
          let errorMessage = "Registration failed. Please try again";
          if (error.code === "auth/email-already-in-use") {
            errorMessage = "The email address is already in use";
            setEmail("");
          } else if (error.code === "auth/weak-password") {
            errorMessage = "The password is too weak";
            setPassword("");
          } else if (error.code === "auth/invalid-email") {
            errorMessage = "The email address is not valid";
            setEmail("");
          }
          Alert.alert("Registration Error", errorMessage);
        });
    } catch (error) {
      Alert.alert("Registration", String(error));
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
          gap: normalize(11),
          marginTop: normalize(136),
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Bold",
            fontSize: normalize(19),
            color: Colors["primary-yellow"],
          }}
        >
          Welcome to Chat Chat
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat-Bold",
            fontSize: normalize(16),
            color: Colors["primary-white"],
          }}
        >
          Let's create an account together!
        </Text>
        <Animated.Image
          source={PentiaLight}
          style={{ width: normalize(140), height: normalize(140) }}
          entering={BounceIn}
          exiting={BounceOut}
        />
      </View>
      {/* form-view start */}
      <View style={{ marginTop: normalize(14) }}>
        <View style={{ alignItems: "center" }}>
          {/* input for username */}
          <View>
            <AuthInput
              changeCallback={setUsername}
              value={username}
              autoCapitalize="none"
              placeholder="Username"
              placeholderTextColor={Colors["primary-medium-grey"]}
              style={[
                defaultStyles.inputField,
                { borderColor: Colors["primary-border"] },
              ]}
            />
          </View>
          {/* input for email */}
          <View style={{ marginTop: normalize(14) }}>
            <AuthInput
              changeCallback={setEmail}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email address"
              placeholderTextColor={Colors["primary-medium-grey"]}
              style={[
                defaultStyles.inputField,
                {
                  borderColor: Colors["primary-border"],
                },
              ]}
            />
          </View>
          {/* input for password with on/off-hide */}
          <View style={{ marginTop: normalize(14) }}>
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
        {/* submit btn */}
        <View style={{ marginTop: normalize(24), alignItems: "center" }}>
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
              onPress={handleRegister}
            >
              <Text
                style={{
                  color: Colors["primary-black"],
                  fontSize: normalize(21),
                  fontFamily: "Montserrat-SemiBold",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* route to login */}
        <View style={{ marginTop: normalize(16) }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("login" as never)}
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
                  fontSize: normalize(16),
                  color: Colors["primary-white"],
                }}
              >
                Already have an account? {""}
              </Text>
              <Text
                style={{
                  fontFamily: "Montserrat-SemiBold",
                  fontSize: normalize(16),
                  color: Colors["primary-yellow"],
                }}
              >
                Sign in here!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: normalize(30),
          }}
        >
          <TouchableOpacity
            style={[defaultStyles.authOutlineBtn, { height: normalize(55) }]}
            onPress={() => navigation.navigate("social-login" as never)}
            className="active:bg-primary-yellow active:opacity-50"
          >
            <Text
              style={{
                fontFamily: "Montserrat-SemiBold",
                fontSize: normalize(16),
                color: Colors["primary-black"],
              }}
            >
              Login with Social Networks
            </Text>
          </TouchableOpacity>
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
    top: normalize(18),
    right: normalize(14),
    alignItems: "center",
  },
});
