import { View, Image, ImageSourcePropType } from "react-native";
import React from "react";

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
        style={{ width: 51.79, height: 51.79, borderRadius: 100 }}
      />
    </View>
  );
};

export default ChatRoomScrollListAvatar;
