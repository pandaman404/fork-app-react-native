import { Dimensions, StyleSheet } from "react-native";
import { theme } from "./theme";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const globalStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  background: {
    backgroundColor: theme.colors.background,
  },
  backgroundDark: {
    backgroundColor: theme.colors.foreground,
  },
  formContainer: {
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.m,
  },
  flexColumn: {
    flexDirection: "column",
  },
  flexRow: {
    flexDirection: "row",
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  flexStartCenter: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flexRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabItem: {
    width: "auto",
  },
  tabIndicator: {
    height: 2,
    backgroundColor: theme.colors.primary,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
    shadowColor: theme.colors.background,
  },
  minHeight: {
    minHeight: "100%",
  },
  windowHeight: {
    height: windowHeight,
  },
  windowWidth: {
    width: windowWidth,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background,
    zIndex: 2,
  },
});
