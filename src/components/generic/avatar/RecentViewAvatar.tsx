import { View, Image, ImageSourcePropType } from "react-native";
import React from "react";

type RecentViewAvatarProps = {
  imgUrl: ImageSourcePropType | undefined;
};

const RecentViewAvatar: React.FC<RecentViewAvatarProps> = ({ imgUrl }) => {
  return (
    <View>
      <Image
        source={imgUrl}
        style={{ width: 65, height: 65, borderRadius: 100 }}
      />
    </View>
  );
};

export default RecentViewAvatar;
