import {
  View,
  TextStyle,
  TextInput,
  ColorValue,
  KeyboardTypeOptions,
  StyleProp,
} from "react-native";
import React, { ReactElement } from "react";

type AuthInputProps = {
  value: string;
  changeCallback: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  placeholderTextColor?: ColorValue | undefined;
  style?: StyleProp<TextStyle> | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  icon?: ReactElement;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean | undefined;
};

const AuthInput: React.FC<AuthInputProps> = ({
  value,
  changeCallback,
  placeholder,
  placeholderTextColor,
  style,
  autoCapitalize,
  icon,
  keyboardType,
  secureTextEntry,
}) => {
  return (
    <View>
      <TextInput
        style={style}
        className="focus:border-2"
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        onChangeText={changeCallback}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
      {icon}
    </View>
  );
};

export default AuthInput;
