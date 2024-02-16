import { View, Image, ImageSourcePropType } from "react-native";
import React from "react";
import normalize from "react-native-normalize";

type ChatRoomScrollListAvatarProps = {
  imgUrl: ImageSourcePropType | undefined;
};

const ChatRoomScrollListAvatar: React.FC<ChatRoomScrollListAvatarProps> = ({
  imgUrl,
}) => {
  return (
    <View>
      <Image
        source={imgUrl}
        style={{
          width: normalize(52.79),
          height: normalize(52.79),
          borderRadius: normalize(50),
        }}
      />
    </View>
  );
};

export default ChatRoomScrollListAvatar;
