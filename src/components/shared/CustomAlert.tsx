import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import { Icon } from "react-native-elements";

const CustomAlert = ({ text, code = "warning", positionY = "1%", positionX = '0%' }: any) => {
  return (
    <View
      style={[
        styles.container,
        {
          bottom: positionY,
          left: positionX
        },
        code === "ok"
          ? { backgroundColor: theme.colors.okSecondary }
          : code === "warning"
            ? { backgroundColor: theme.colors.alertSecondary }
            : null,
      ]}
    >
      {code === "ok" ? (
        <Icon
          name={"checkcircle"}
          type="antdesign"
          color={theme.colors.okPrimary}
          size={20}
        />
      ) : code === "warning" ? (
        <Icon
          name={"alert"}
          type="material-community"
          color={theme.colors.alertPrimary}
          size={23}
        />
      ) : null}
      <Text style={[theme.textVariants.bodyVariant2, styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    zIndex: 10,
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

export default CustomAlert;
