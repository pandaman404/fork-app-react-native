import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { theme } from "../../styles/theme";

const GoToPackButton = ({ id, packType, navigate }: any) => {
  return (
    <Button
      title={"Agregar"}
      icon={{
        type: "material",
        name: "shopping-bag",
        color: theme.colors.background,
        size: 22,
      }}
      iconPosition="right"
      buttonStyle={styles.button}
      titleStyle={[theme.textVariants.button, styles.buttonTitle]}
      containerStyle={styles.buttonContainer}
      onPress={() => navigate("ProductDetailScreen", { id, packType })}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.foreground,
    display: "flex",
    justifyContent: "flex-start",
    minHeight: 40,
  },
  buttonTitle: {
    color: theme.colors.background,
    textTransform: "uppercase",
    justifyContent: "center",
  },
  buttonContainer: {
    borderRadius: 30,
    width: 130,
  },
});

export default GoToPackButton;
