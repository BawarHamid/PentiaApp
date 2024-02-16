import { StyleSheet } from "react-native";
import Colors from "./Colors";
import { Dimensions } from "react-native";
import normalize from "react-native-normalize";
const { width, height } = Dimensions.get("window");

export const defaultStyles = StyleSheet.create({
  containerLightTheme: {
    flex: 1,
    backgroundColor: Colors["primary-bgcolor"],
  },
  containerDarkTheme: {
    flex: 1,
    backgroundColor: Colors["primary-darkbg"],
  },
  inputField: {
    height: normalize(55),
    width: normalize(320),
    color: Colors["primary-black"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(51),
    paddingLeft: normalize(31),
    backgroundColor: Colors["primary-white"],
    fontFamily: "Montserrat-SemiBold",
    fontSize: normalize(16),
  },
  authBtn: {
    backgroundColor: Colors["primary-yellow"],
    height: normalize(55),
    width: normalize(320),
    borderRadius: normalize(12),
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  authOutlineBtn: {
    height: normalize(40),
    width: normalize(320),
    borderRadius: normalize(12),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: normalize(5),
    backgroundColor: Colors["primary-yellow"],
    borderColor: Colors["primary-border"],
  },
  socialsBtnRounded: {
    backgroundColor: Colors["primary-white"],
    height: normalize(70),
    width: normalize(70),
    borderRadius: normalize(51),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    fontFamily: "Montserrat-SemiBold",
    shadowColor: Colors["primary-white"],
  },
  socialBtnSmallIcon: {
    position: "absolute",
    alignItems: "center",
  },
});

export const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors["primary-white"],
    padding: normalize(26),
  },
  viewSeparator: {
    flexDirection: "row",
    gap: normalize(12),
    paddingHorizontal: normalize(36),
    alignItems: "center",
  },
  textSeparator: {
    fontFamily: "Montserrat-SemiBold",
    color: Colors["primary-yellow"],
  },
});
