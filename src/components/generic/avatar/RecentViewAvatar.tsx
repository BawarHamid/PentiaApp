import { View, Image, ImageSourcePropType } from "react-native";
import React from "react";
import normalize from "react-native-normalize";

type RecentViewAvatarProps = {
  imgUrl: ImageSourcePropType | undefined;
};

const RecentViewAvatar: React.FC<RecentViewAvatarProps> = ({ imgUrl }) => {
  return (
    <View>
      <Image
        source={imgUrl}
        style={{
          width: normalize(65.5),
          height: normalize(65.5),
          borderRadius: normalize(51),
        }}
      />
    </View>
  );
};

export default RecentViewAvatar;
