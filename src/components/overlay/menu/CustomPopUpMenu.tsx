import { View, Text, Alert } from "react-native";
import React, { ReactElement } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Colors from "../../../utils/constants/Colors";
import { useAuth } from "../../../context/UserContext";
import VectorIcon from "../../../assets/icons/VectorIcons";
import Animated, {
  FadeInUp,
  FadeOutDown,
  PinwheelIn,
  PinwheelOut,
} from "react-native-reanimated";

type PopUpMenuProps = {
  icon: ReactElement;
};

const CustomPopUpMenu: React.FC<PopUpMenuProps> = ({ icon }) => {
  const { user, logout } = useAuth();

  return (
    <Animated.View>
      <Menu>
        <MenuTrigger>{icon}</MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              backgroundColor: Colors["primary-bgcolor"],
              marginTop: 30,
              marginLeft: -10,
            },
          }}
        >
          <MenuOption
            disabled={true}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: Colors["primary-medium-black"],
                fontFamily: "Montserrat-SemiBold",
                alignItems: "center",
              }}
            >
              Hi {user?.username}
            </Text>
          </MenuOption>

          <MenuOption
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onSelect={() =>
              Alert.alert(
                "Logging out...",
                "Are you sure you want to logout?",
                [
                  {
                    text: "No",
                    style: "cancel",
                  },
                  { text: "Yes", onPress: () => logout() },
                ],
                {
                  cancelable: true,
                }
              )
            }
          >
            <Text
              style={{
                color: Colors["primary-red"],
                fontFamily: "Montserrat-SemiBold",
                alignItems: "center",
              }}
            >
              Log out?
            </Text>
            <VectorIcon
              type="MaterialCommunityIcons"
              name="logout"
              color="red"
              size={24}
            />
          </MenuOption>
          {/* <MenuOption>
            <View
              style={{
                padding: 0.5,
                width: "100%",
                backgroundColor: "#9CA3AF",
              }}
            />
          </MenuOption> */}
        </MenuOptions>
      </Menu>
    </Animated.View>
  );
};

export default CustomPopUpMenu;
