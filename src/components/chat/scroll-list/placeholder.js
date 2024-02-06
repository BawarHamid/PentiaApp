// import {
//     Text,
//     ScrollView,
//     TouchableOpacity,
//     Dimensions,
//     RefreshControl,
//   } from "react-native";
//   import React, { useCallback, useRef, useState } from "react";
//   import pb1 from "../../../assets/images/dummy-data/Ellipse1.png";
//   import pb2 from "../../../assets/images/dummy-data/Ellipse2.png";
//   import pb3 from "../../../assets/images/dummy-data/Ellipse3.png";
//   import pb4 from "../../../assets/images/dummy-data/Ellipse4.png";
//   import pb5 from "../../../assets/images/dummy-data/Ellipse5.png";
//   import pb6 from "../../../assets/images/dummy-data/Ellipse6.png";
//   import pb7 from "../../../assets/images/dummy-data/Ellipse7.png";
//   import pb8 from "../../../assets/images/dummy-data/Ellipse8.png";
//   import pb9 from "../../../assets/images/dummy-data/Ellipse9.png";
//   import pb10 from "../../../assets/images/dummy-data/Ellipse10.png";
//   import pb11 from "../../../assets/images/dummy-data/Ellipse11.png";
//   import ChatRoomScrollListAvatar from "../../generic/avatar/ChatRoomScrollListAvatar";
//   import Colors from "../../../utils/constants/Colors";
//   import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
//   const { width, height } = Dimensions.get("window");

//   const RecentChatList = [
//     {
//       img: pb7,
//       username: "Emil",
//       chatName: "Gaming",
//       message: "Er du hjemme?",
//       messageDate: "08:30",
//     },
//     {
//       img: pb8,
//       username: "Joakim",
//     },
//     {
//       img: pb11,
//       username: "Tina",
//     },
//     {
//       img: pb9,
//       username: "Ahmad",
//     },
//     {
//       img: pb10,
//       username: "Henrik",
//     },
//     {
//       img: pb6,
//       username: "Marc",
//     },
//     {
//       img: pb1,
//       username: "Frederik",
//     },
//     {
//       img: pb2,
//       username: "Jens",
//     },
//     {
//       img: pb3,
//       username: "Line",
//     },
//     {
//       img: pb4,
//       username: "Karen",
//     },
//     {
//       img: pb5,
//       username: "Anders",
//     },
//   ];

//   const ChatRoomScrollList: React.FC = () => {
//     const [loading, setLoading] = useState<boolean>(false);
//     const [refreshing, setRefreshing] = React.useState(false);
//     const listRef = useRef<ScrollView>(null);

//     const onRefresh = useCallback(() => {
//       setRefreshing(true);
//       setTimeout(() => {
//         setRefreshing(false);
//       }, 2000);
//     }, []);

//     return (
//       <ScrollView
//         ref={listRef}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{
//           backgroundColor: Colors["primary-lightbg"],
//           borderRadius: 50,
//           height: height,
//           width: width,
//         }}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         <Animated.View
//           style={{ marginTop: height * 0.045, gap: 30 }}
//           entering={FadeInRight}
//           exiting={FadeOutLeft}
//         >
//           {RecentChatList.map((recentChats, key) => (
//             <TouchableOpacity
//               key={key}
//               style={{
//                 alignItems: "center",
//                 gap: 10,
//                 flexDirection: "row",
//                 paddingHorizontal: 25,
//               }}
//             >
//               <ChatRoomScrollListAvatar imgUrl={recentChats.img} />
//               <Text
//                 style={{
//                   fontFamily: "Montserrat-SemiBold",
//                   fontSize: 14,
//                   color: Colors["primary-white"],
//                 }}
//               >
//                 {recentChats.username}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </Animated.View>
//       </ScrollView>
//     );
//   };

//   export default ChatRoomScrollList;

// ny scrollView:

// import {
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   RefreshControl,
// } from "react-native";
// import React, { useCallback, useRef, useState } from "react";
// import pb1 from "../../../assets/images/dummy-data/Ellipse1.png";
// import pb2 from "../../../assets/images/dummy-data/Ellipse2.png";
// import pb3 from "../../../assets/images/dummy-data/Ellipse3.png";
// import pb4 from "../../../assets/images/dummy-data/Ellipse4.png";
// import pb5 from "../../../assets/images/dummy-data/Ellipse5.png";
// import pb6 from "../../../assets/images/dummy-data/Ellipse6.png";
// import pb7 from "../../../assets/images/dummy-data/Ellipse7.png";
// import pb8 from "../../../assets/images/dummy-data/Ellipse8.png";
// import pb9 from "../../../assets/images/dummy-data/Ellipse9.png";
// import pb10 from "../../../assets/images/dummy-data/Ellipse10.png";
// import pb11 from "../../../assets/images/dummy-data/Ellipse11.png";
// import ChatRoomScrollListAvatar from "../../generic/avatar/ChatRoomScrollListAvatar";
// import Colors from "../../../utils/constants/Colors";
// import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
// const { width, height } = Dimensions.get("window");

// const RecentChatList = [
//   {
//     img: pb7,
//     username: "Emil",
//     chatName: "Gaming",
//     message: "Er du hjemme?",
//     messageDate: "08:30",
//   },
//   {
//     img: pb8,
//     username: "Joakim",
//   },
//   {
//     img: pb11,
//     username: "Tina",
//   },
//   {
//     img: pb9,
//     username: "Ahmad",
//   },
//   {
//     img: pb10,
//     username: "Henrik",
//   },
//   {
//     img: pb6,
//     username: "Marc",
//   },
//   {
//     img: pb1,
//     username: "Frederik",
//   },
//   {
//     img: pb2,
//     username: "Jens",
//   },
//   {
//     img: pb3,
//     username: "Line",
//   },
//   {
//     img: pb4,
//     username: "Karen",
//   },
//   {
//     img: pb5,
//     username: "Anders",
//   },
// ];

// const ChatRoomScrollList: React.FC = () => {
//   const [loading, setLoading] = useState < boolean > false;
//   const [refreshing, setRefreshing] = React.useState(false);
//   const listRef = useRef < Animated.ScrollView > null;

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, []);

//   return (
//     <Animated.ScrollView
//       entering={FadeInRight}
//       exiting={FadeOutLeft}
//       ref={listRef}
//       horizontal={false}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{
//         backgroundColor: Colors["primary-lightbg"],
//         borderRadius: 50,
//         paddingBottom: 50,
//         paddingHorizontal: 25,
//         paddingTop: height * 0.045,
//       }}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     >
//       <Animated.View>
//         {RecentChatList.map((recentChats, index) => (
//           <TouchableOpacity
//             key={index}
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginBottom: 30, // Instead of gap for vertical spacing
//             }}
//           >
//             <ChatRoomScrollListAvatar imgUrl={recentChats.img} />
//             <Text
//               style={{
//                 fontFamily: "Montserrat-SemiBold",
//                 fontSize: 14,
//                 color: Colors["primary-white"],
//                 marginLeft: 10, // Instead of gap for horizontal spacing
//               }}
//             >
//               {recentChats.username}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </Animated.View>
//     </Animated.ScrollView>
//   );
// };

// export default ChatRoomScrollList;

return (
  <Animated.ScrollView
    entering={FadeInRight}
    exiting={FadeOutLeft}
    ref={listRef}
    horizontal={false}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      backgroundColor: Colors["primary-lightbg"],
      borderRadius: 50,
      paddingBottom: 20,
      paddingHorizontal: 25,
      paddingTop: height * 0.045,
    }}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
    <Animated.View>
      {RecentChatList.map((recentChats, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 30, // Instead of gap for vertical spacing
          }}
        >
          <ChatRoomScrollListAvatar imgUrl={recentChats.img} />
          <Text
            style={{
              fontFamily: "Montserrat-SemiBold",
              fontSize: 14,
              color: Colors["primary-white"],
              marginLeft: 10, // Instead of gap for horizontal spacing
            }}
          >
            {recentChats.username}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  </Animated.ScrollView>
);
