import {
  View,
  TouchableOpacity,
  TextInput,
  ColorValue,
  TextStyle,
  StyleProp,
  KeyboardTypeOptions,
  GestureResponderEvent,
} from "react-native";
import React, { ReactElement } from "react";
import Colors from "../../../utils/constants/Colors";
import normalize from "react-native-normalize";

type MessageTextInputProps = {
  iconLeft: ReactElement;
  placeholder?: string;
  placeholderTextColor?: ColorValue | undefined;
  iconRight: ReactElement;
  value: string;
  changeCallback: React.Dispatch<React.SetStateAction<string>>;
  style?: StyleProp<TextStyle> | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean;
};

const MessageTextInput: React.FC<MessageTextInputProps> = ({
  iconLeft,
  placeholder,
  iconRight,
  value,
  changeCallback,
  placeholderTextColor,
  style,
  autoCapitalize,
  keyboardType,
  secureTextEntry,
  onPress,
  disabled,
}) => {
  return (
    <View style={{ paddingHorizontal: normalize(23) }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: normalize(12),
          backgroundColor: Colors["primary-textinputbg"],
          height: normalize(48),
          borderRadius: normalize(51),
          marginBottom: normalize(18),
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors["primary-iconbg-grey"],
            borderRadius: normalize(51),
            paddingHorizontal: normalize(6),
            paddingVertical: normalize(6),
            alignItems: "center",
          }}
        >
          {iconLeft}
        </TouchableOpacity>
        <TextInput
          onChangeText={changeCallback}
          value={value}
          style={style}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={onPress}
          disabled={disabled}
        >
          {iconRight}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageTextInput;
