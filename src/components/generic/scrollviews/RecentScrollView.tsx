import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "../../../utils/constants/Colors";
import RecentViewAvatar from "../avatar/RecentViewAvatar";

type RecentScrollViewProps = {
  title?: string;
  img: ImageSourcePropType | undefined;
  username?: string;
};

const RecentScrollView: React.FC<RecentScrollViewProps> = ({
  title,
  img,
  username,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        paddingLeft: 25,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}></View>
      <Text
        style={{
          fontFamily: "Montserrat-Medium",
          fontSize: 12,
          color: Colors["primary-medium-black"],
        }}
      >
        {title}
      </Text>
      <View style={{ marginTop: 5 }}>
        <RecentViewAvatar imgUrl={img} />
        <Text
          style={{
            fontFamily: "Montserrat-Medium",
            fontSize: 14,
            color: Colors["primary-blue"],
          }}
        >
          {username}
        </Text>
      </View>
    </ScrollView>
  );
};

export default RecentScrollView;
