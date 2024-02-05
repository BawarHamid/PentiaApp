import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import Colors from "../../../utils/constants/Colors";

type HeaderProps = {
  title: string;
  icon: ReactElement;
};

const Header: React.FC<HeaderProps> = ({ title, icon }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 25,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Montserrat-SemiBold",
          fontSize: 20,
          color: Colors["primary-blue"],
        }}
      >
        {title}
      </Text>
      <TouchableOpacity>{icon}</TouchableOpacity>
    </View>
  );
};

export default Header;
