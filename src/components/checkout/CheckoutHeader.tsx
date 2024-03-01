import React from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import GoBackButton from "../shared/GoBackButton";
import { theme } from "../../styles/theme";

const CheckoutHeader = ({ title, xIcon }: any) => {
  return (
    <SafeAreaView style={styles.header}>
      <GoBackButton xIcon={xIcon} />
      <Text style={[theme.textVariants.title, styles.title]}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.foreground,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.m,
    height: Platform.OS === "ios" ? 100 : 70,
  },
  title: {
    color: theme.colors.background,
    marginLeft: theme.spacing.m,
  },
});

export default CheckoutHeader;
