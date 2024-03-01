import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import { Icon } from "react-native-elements";

const ErrorAlert = ({ text, positionY = "1%" }: any) => {
  return (
    <View style={[styles.container, { bottom: positionY }]}>
      <Icon
        name="alert"
        type="material-community"
        color={theme.colors.newProduct}
        size={25}
      />
      <Text style={[theme.textVariants.bodyVariant2, styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.alert,
    width: "100%",
    position: "absolute",
    zIndex: 3,
    marginHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: theme.colors.foregroundVariant,
    marginLeft: theme.spacing.xs,
  },
});

export default ErrorAlert;
