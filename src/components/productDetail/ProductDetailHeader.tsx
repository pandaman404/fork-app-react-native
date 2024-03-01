import React from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import GoBackButton from "../shared/GoBackButton";
import BlackShape from "../../assets/mask-product-desktop.svg";
import { theme } from "../../styles/theme";

const ProductDetailHeader = () => {
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.goBack}>
        <GoBackButton />
      </View>
      <Text style={[theme.textVariants.title, styles.title]}>Productos</Text>
      <BlackShape style={styles.shape} />
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
  goBack: {
    zIndex: 2,
  },
  title: {
    color: theme.colors.background,
    marginLeft: theme.spacing.m,
    zIndex: 2,
  },
  shape: {
    position: "absolute",
    left: "17%",
    transform: [{ scaleX: 1.8 }],
  },
});

export default ProductDetailHeader;
