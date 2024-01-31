import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import VectorIcon from "../assets/icons/VectorIcons";
import Colors from "../constants/Colors";
import PentiaLogo from "../assets/images/LogoImgs/PentiaLogo.png";

const HomeScreen = () => {
  return (
    <View className="mt-2 items-center justify-center">
      <View>
        <Text className="text-center">You are logged in!</Text>
        <Text className="text-center">All the chats are displayed here</Text>
      </View>

      <View className="items-end">
        <TouchableOpacity>
          {/* <VectorIcon
            type="Entypo"
            name="chevron-left"
            color="black"
            size={24}
          /> */}
          <Image source={PentiaLogo} className="h-10 w-10" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
