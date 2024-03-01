import React from "react";
import { Linking } from "react-native";
import { Button } from "react-native-elements";
import { recoverPasswordButtonStyles } from "../../styles/buttons";
import { theme } from "../../styles/theme";
import { recoverPasswordURL } from "../../utils/env";

const RecoverPasswordButton = () => {
  return (
    <Button
      title="Recuperar Contraseña"
      type="outline"
      onPress={() => Linking.openURL(recoverPasswordURL)}
      containerStyle={recoverPasswordButtonStyles.container}
      buttonStyle={recoverPasswordButtonStyles.button}
      titleStyle={[theme.textVariants.button, recoverPasswordButtonStyles.text]}
    />
  );
};

export default RecoverPasswordButton;
