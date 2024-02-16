import { View, Text, Alert } from "react-native";
import React, { ReactElement } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Colors from "../../../utils/constants/Colors";
import VectorIcon from "../../../assets/icons/VectorIcons";
import { useAuth } from "../../../context/useAuth";
import normalize from "react-native-normalize";

type PopUpMenuProps = {
  icon: ReactElement;
};

const CustomPopUpMenu: React.FC<PopUpMenuProps> = ({ icon }) => {
  const { user, logout } = useAuth();

  return (
    <View>
      <Menu>
        <MenuTrigger style={{ alignItems: "center" }}>{icon}</MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: normalize(12),
              backgroundColor: Colors["primary-bgcolor"],
              marginTop: normalize(46),
              marginLeft: normalize(-8),
            },
          }}
        >
          <MenuOption
            disabled={true}
            style={{
              paddingHorizontal: normalize(17),
              paddingVertical: normalize(12),
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
              Hi {user?.displayName ? user.displayName : user?.username}
            </Text>
          </MenuOption>

          <MenuOption
            style={{
              paddingHorizontal: normalize(17),
              paddingVertical: normalize(12),
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
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default CustomPopUpMenu;
