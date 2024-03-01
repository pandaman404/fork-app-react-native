import React from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { globalStyles } from "../../styles/global";
import RecoverPasswordButton from "../../components/auth/RecoverPasswordButton";
import CustomTextInput from "../../components/shared/CustomTextInput";
import { EMAIL_REGEX } from "../../utils/constants";
import LoginButton from "../../components/auth/LoginButton";
import { useConfigContext } from "../../contexts/ConfigContext";
import Loader from "../../components/shared/Loader";
import CustomAlert from "../../components/shared/CustomAlert";
import DismissKeyboard from "../../components/shared/DismissKeyboard";

const LoginScreen = () => {
  const { authLoading, authError } = useConfigContext();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <DismissKeyboard>
      <View style={[globalStyles.formContainer, globalStyles.flex1]}>
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <CustomTextInput
              placeholder="Email"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Campo requerido",
            // pattern: { value: EMAIL_REGEX, message: "Ingrese un correo valido" },
          }}
        />

        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <CustomTextInput
              placeholder="Contraseña"
              secureTextEntry={true}
              onBlur={onBlur}
              error={error}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Campo requerido",
          }}
        />

        {authLoading ? (
          <Loader />
        ) : (
          <View style={[globalStyles.flexColumn, globalStyles.flexCenter]}>
            <LoginButton title="Entrar con Email" handleSubmit={handleSubmit} />
            <RecoverPasswordButton />
          </View>
        )}

        {authError.length > 0 && <CustomAlert text={authError} />}
      </View>
    </DismissKeyboard>
  );
};

export default LoginScreen;
