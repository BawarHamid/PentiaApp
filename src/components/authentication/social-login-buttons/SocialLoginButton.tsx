import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
} from "react-native";
import React, { ReactElement } from "react";

type SocialLoginButtonProps = {
  disabled?: boolean;
  icon: ReactElement;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<TextStyle> | undefined;
};

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  disabled,
  icon,
  onPress,
  style,
}) => {
  return (
    <View>
      <TouchableOpacity disabled={disabled} style={style} onPress={onPress}>
        {icon}
      </TouchableOpacity>
    </View>
  );
};

export default SocialLoginButton;
