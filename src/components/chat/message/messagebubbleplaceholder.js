const renderChatItem: ListRenderItem<any> = ({ item }) => (
  // this is what the logged in user see
  <View>
    {user?.userId === item.userId ? (
      <View
        style={{
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          marginBottom: 24,
          paddingLeft: 55,
        }}
      >
        {/* Chat bubble - you */}
        <View
          style={{
            backgroundColor: Colors["primary-textinputbg"],
            borderRadius: 10,
            padding: 12,
          }}
        >
          <Text
            style={{
              color: Colors["primary-white"],
              fontFamily: "Montserrat-Medium",
              fontSize: 14,
            }}
          >
            {item.message}
          </Text>
        </View>
      </View>
    ) : (
      // this is what the receiver see
      <View
        style={{
          justifyContent: "flex-start",
          flexDirection: "row",
          alignSelf: "flex-start",
          alignItems: "flex-end", // Aligns the icon on the bottom of the msg
          marginBottom: 24,
          paddingRight: 55,
        }}
      >
        {/* Vector icon placed on the left side */}
        <View style={{ alignItems: "center" }}>
          <VectorIcon
            type={"Ionicons"}
            name="person-circle-outline"
            color={Colors["primary-messagebg-grey"]}
            size={34}
          />
        </View>

        <View style={{ marginLeft: 10 }}>
          {/* Username */}
          <Text
            style={{
              color: Colors["primary-yellow"],
              fontFamily: "Montserrat-Medium",
              fontSize: 12,
              marginBottom: height * 0.008,
            }}
          >
            {item.username}
          </Text>

          {/* Chat bubble - receiver */}
          <View
            style={{
              backgroundColor: Colors["primary-messagebg-grey"],
              borderRadius: 10,
              padding: 12,
            }}
          >
            <Text
              style={{
                color: Colors["primary-white"],
                fontFamily: "Montserrat-Medium",
                fontSize: 14,
              }}
            >
              {item.message}
            </Text>
          </View>
        </View>
      </View>
    )}
  </View>
);
