import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ColorValue,
  TextStyle,
  StyleProp,
  KeyboardTypeOptions,
  Dimensions,
  GestureResponderEvent,
} from "react-native";
import React, { ReactElement } from "react";
import Colors from "../../../utils/constants/Colors";

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
  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ paddingHorizontal: 25 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          backgroundColor: Colors["primary-textinputbg"],
          height: height * 0.06,
          borderRadius: 50,
          marginBottom: 16,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors["primary-iconbg-grey"],
            borderRadius: 100,
            paddingHorizontal: 4,
            paddingVertical: 4,
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
