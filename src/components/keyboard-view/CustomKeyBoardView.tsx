import { Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { ReactNode } from "react";
import { defaultStyles } from "../../utils/constants/Styles";

const ios = Platform.OS == "ios";

const CustomKeyBoardView = ({ children }: { children: ReactNode }) => {
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={defaultStyles.containerDarkTheme}
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
