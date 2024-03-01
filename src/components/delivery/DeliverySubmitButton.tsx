import React from "react";
import { Button } from "react-native-elements";
import { clean, format } from "rut.js";
import { primaryButtonStyles } from "../../styles/buttons";
import { theme } from "../../styles/theme";

const DeliverySubmitButton = ({ title, handleSubmit }: any) => {
  const onSubmit = (data: any) => {
    // let {} = data
    console.log(data);
  };

  return (
    <Button
      title={title}
      onPress={handleSubmit(onSubmit)}
      containerStyle={primaryButtonStyles.container}
      buttonStyle={primaryButtonStyles.button}
      titleStyle={[theme.textVariants.button, primaryButtonStyles.text]}
    />
  );
};

export default DeliverySubmitButton;
