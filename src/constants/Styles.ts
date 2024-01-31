import { StyleSheet } from "react-native";
import Colors from "./Colors";

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFFF",
  },
  inputField: {
    height: 50,
    width: width * 0.95,
    color: Colors["primary-black"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    paddingLeft: 30,
    fontFamily: "Montserrat-SemiBold",
    backgroundColor: "#ffffff",
  },
  authBtn: {
    backgroundColor: Colors["primary-cyan"],
    height: 55,
    width: width * 0.95,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  socialsBtn: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Colors["primary-medium-black"],
    height: 50,
    width: width * 0.95,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    fontFamily: "Montserrat-SemiBold",
  },
  socialsBtnText: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    textAlign: "center",
  },
  socialBtnIcon: {
    position: "absolute",
    left: 16,
  },

  btn: {
    backgroundColor: Colors["primary-red"],
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "mon-bold",
  },
  btnIcon: {
    position: "absolute",
    left: 16,
  },
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopColor: Colors["primary-grey"],
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
    padding: 26,
  },
  viewSeparator: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textSeparator: {
    fontFamily: "mon-semi-bold",
    color: Colors["primary-medium-black"],
  },
});
