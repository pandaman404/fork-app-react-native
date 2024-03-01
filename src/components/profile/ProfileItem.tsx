import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

const ProfileItem = ({ text1, text2 }: any) => {
  return (
    <View style={styles.container}>
      <Text style={[theme.textVariants.body, styles.text1]}>{text1}</Text>
      <Text style={[theme.textVariants.bodyVariant2, styles.text2]}>{text2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondaryVariant2,
  },
  text1: {
    color: theme.colors.foreground,
    marginBottom: theme.spacing.s,
  },
  text2: {
    color: theme.colors.secondaryVariant,
  },
});

export default ProfileItem;
