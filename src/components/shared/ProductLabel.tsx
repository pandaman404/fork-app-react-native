import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { theme } from "../../styles/theme";

const ProductLabel = ({ text }: any) => {
  return (
    <View style={[styles.tag, text === "NUEVO" ? styles.yellow : styles.red]}>
      <Text style={[theme.textVariants.productTag, styles.tagText]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    color: theme.colors.background,
    borderRadius: 2,
    width: 100,
  },
  tagText: {
    textAlign: "center",
    textTransform: "uppercase",
    color: theme.colors.background,
  },
  red: {
    backgroundColor: theme.colors.primary,
  },
  yellow: {
    backgroundColor: theme.colors.newProduct,
  },
});

export default ProductLabel;
