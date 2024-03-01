import React from "react";
import { Image, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import GoBackButton from "../shared/GoBackButton";
import { theme } from "../../styles/theme";
import BlackShape from "../../assets/mask-product-desktop.svg";
import { useConfigContext } from "../../contexts/ConfigContext";
import LogoFork from "../../../src/assets/logo-fork.png";

const AuthHeader = () => {
  const { authLoading } = useConfigContext();

  return (
    <SafeAreaView style={styles.header}>
      <View style={[styles.goBackContainer]}>
        <GoBackButton disabled={authLoading} />
      </View>
      <Image source={LogoFork} style={[styles.logo]} />
      <BlackShape style={styles.shape} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 110,
    width: "100%",
    alignItems: "flex-start",
    paddingTop: theme.spacing.l,
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.m,
    backgroundColor: theme.colors.background,
    zIndex: 2,
  },
  logo: {
    height: 41,
    width: 70,
    left: "42%",
    bottom: "35%",
    tintColor: theme.colors.background,
    zIndex: 3,
  },
  shape: {
    position: "absolute",
    left: "17%",
    top: "-60%",
    transform: [{ scaleX: 1.8 }],
  },
  goBackContainer: {
    zIndex: 2,
  },
});

export default AuthHeader;
