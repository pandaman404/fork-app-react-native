import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import { globalStyles } from "../../styles/global";
const Loader = () => {
  return (
    <View style={[globalStyles.flex1, globalStyles.flexCenter]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

export default Loader;
