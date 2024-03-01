import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import PackMenuRadioButton from "./PackMenuRadioButton";
import PackNProductsButton from "./PackNProductsButton";

const ItemsSection = ({ title }: any) => {
  return (
    <View style={styles.container}>
      <Text style={[theme.textVariants.body, styles.title]}>{title}</Text>
      <PackMenuRadioButton />
      <PackNProductsButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: theme.spacing.m,
  },
  title: {
    width: "100%",
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
  },
});

export default ItemsSection;
