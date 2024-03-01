import React, { useEffect } from "react";
import { Text, View } from "react-native";
import ProfileTabs from "../../navigators/ProfileTabs";
import { globalStyles } from "../../styles/global";

const ProfileScreen = (props: any) => {
  return (
    <View style={globalStyles.flex1}>
      <ProfileTabs {...props} />
    </View>
  );
};

export default ProfileScreen;
