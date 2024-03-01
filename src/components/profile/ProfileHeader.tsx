import React from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import GoBackButton from "../shared/GoBackButton";

const ProfileHeader = () => {
  return (
    <SafeAreaView style={styles.header}>
      <GoBackButton black />
      <Text style={[theme.textVariants.title, styles.title]}>Perfil</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.background,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.m,
    height: Platform.OS === "ios" ? 100 : 70,
  },
  title: {
    color: theme.colors.foreground,
    marginLeft: theme.spacing.m,
  },
});

export default ProfileHeader;
