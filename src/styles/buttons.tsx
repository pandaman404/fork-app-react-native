import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const primaryButtonStyles = StyleSheet.create({
  container: {
    borderRadius: 20,
    shadowColor: theme.colors.foregroundVariant,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    zIndex: 1000,
    top: -10
  },
  button: {
    backgroundColor: theme.colors.primary,
  },
  text: {
    textTransform: "uppercase",
    paddingHorizontal: theme.spacing.l,
  },
});

export const secondaryButtonStyles = StyleSheet.create({
  container: {},
  button: {
    borderRadius: 20,
    borderColor: theme.colors.secondaryVariant2,
    borderWidth: 1,
  },
  text: {
    color: theme.colors.primary,
    textTransform: "uppercase",
    paddingHorizontal: theme.spacing.s,
  },
});

export const deliveryHomeButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 7,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.s,
  },
  text: {
    color: theme.colors.secondaryVariant,
  },
});

export const iconButtonStyles = StyleSheet.create({
  container: {
    padding: 0,
  },
});

export const addItemButtonStyles = StyleSheet.create({
  container: {
    maxWidth: 210,
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.xl,
  },
  button: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
    borderRadius: 50,
    paddingHorizontal: theme.spacing.m,
  },
  icon: {},
  text: {
    color: theme.colors.foreground,
    paddingHorizontal: theme.spacing.xs,
    textTransform: "uppercase",
  },
});

export const recoverPasswordButtonStyles = StyleSheet.create({
  container: {
    width: "50%",
    marginTop: theme.spacing.l,
  },
  button: {
    borderRadius: 20,
    borderColor: theme.colors.secondaryVariant2,
    borderWidth: 1,
  },
  text: {
    color: theme.colors.primary,
    width: "60%",
    textTransform: "uppercase",
  },
});
