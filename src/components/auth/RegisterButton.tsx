import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "react-native-elements";
import { clean, format } from "rut.js";
import { useConfigContext } from "../../contexts/ConfigContext";
import { primaryButtonStyles } from "../../styles/buttons";
import { theme } from "../../styles/theme";

const RegisterButton = ({ title, handleSubmit }: any) => {
  const { onRegisterSubmit } = useConfigContext();
  const onSubmit = (data: any) => {
    let rut = format(data.rut, { dots: false });

    const formattedData = {
      name: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone_number: "+56" + data.phone,
      rut_dv: rut,
      password: data.password,
    };

    onRegisterSubmit(formattedData);
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

export default RegisterButton;
