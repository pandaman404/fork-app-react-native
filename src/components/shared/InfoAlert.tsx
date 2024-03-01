import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import { Icon } from "react-native-elements";

const InfoAlert = ({ text }: any) => {
  return (
    <View style={[styles.container]}>
      <Icon
        name="info"
        type="material"
        color={theme.colors.infoPrimary}
        size={25}
        style={styles.icon}
      />
      <Text style={[theme.textVariants.bodyVariant2, styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.infoSecondary,
    width: "100%",
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.l,
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colors.infoPrimary,
    borderWidth: 1,
    // marginVertical: theme.spacing.l,
  },
  icon: {
    bottom: 2.5,
  },
  text: {
    color: theme.colors.secondaryVariant,
    marginHorizontal: theme.spacing.l,
  },
});

export default InfoAlert;
