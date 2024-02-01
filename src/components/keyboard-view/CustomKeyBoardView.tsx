import { Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { ReactNode } from "react";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";

const ios = Platform.OS == "ios";

const CustomKeyBoardView = ({ children }: { children: ReactNode }) => {
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={defaultStyles.container}
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
