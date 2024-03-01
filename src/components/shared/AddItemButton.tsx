import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { theme } from "../../styles/theme";

const AddItemButton = ({ title, screenName, navigate, openModal }: any) => {
  return (
    <Button
      type="outline"
      title={title}
      icon={{
        name: "plus",
        type: "entypo",
        size: 22,
        color: theme.colors.foreground,
      }}
      containerStyle={styles.containerNewAddress}
      buttonStyle={styles.newAddress}
      titleStyle={[theme.textVariants.button, styles.textNewAddress]}
      onPress={
        navigate
          ? () => navigate(screenName)
          : openModal
            ? () => openModal()
            : () => {}
      }
    />
  );
};

const styles = StyleSheet.create({
  containerNewAddress: {
    maxWidth: 210,
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.xl,
  },
  newAddress: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
    borderRadius: 50,
    paddingHorizontal: theme.spacing.m,
  },
  iconNewAddress: {},
  textNewAddress: {
    color: theme.colors.foreground,
    textTransform: "uppercase",
    paddingHorizontal: theme.spacing.xs,
  },
});

export default AddItemButton;
