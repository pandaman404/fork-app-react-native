import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { theme } from "../../styles/theme";

const ScanQRButton = () => {
  return (
    <Button
      title="Escanear QR"
      icon={{
        type: "antdesign",
        name: "qrcode",
        color: theme.colors.background,
        size: 28,
      }}
      iconPosition="left"
      buttonStyle={styles.button}
      titleStyle={[theme.textVariants.button, styles.buttonTitle]}
      containerStyle={styles.buttonContainer}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.xs,
  },
  buttonTitle: {
    color: theme.colors.background,
    textTransform: "uppercase",
  },
  buttonContainer: {
    borderRadius: 30,
    shadowColor: theme.colors.foregroundVariant,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default ScanQRButton;
