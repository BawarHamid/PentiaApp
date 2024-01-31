import { Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";

const ios = Platform.OS == "ios";

const CustomKeyBoardView = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyBoardView;
