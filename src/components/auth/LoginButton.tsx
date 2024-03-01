import React from "react";
import { Button } from "react-native-elements";
import { useConfigContext } from "../../contexts/ConfigContext";
import { primaryButtonStyles } from "../../styles/buttons";
import { theme } from "../../styles/theme";

const LoginButton = ({ title, handleSubmit }: any) => {
  const { onLoginSubmit } = useConfigContext();
  return (
    <Button
      title={title}
      onPress={handleSubmit(onLoginSubmit)}
      containerStyle={primaryButtonStyles.container}
      buttonStyle={primaryButtonStyles.button}
      titleStyle={[theme.textVariants.button, primaryButtonStyles.text]}
    />
  );
};

export default LoginButton;
