import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { globalStyles } from "../../styles/global";
import RegisterButton from "../../components/auth/RegisterButton";
import CustomTextInput from "../../components/shared/CustomTextInput";
import TermsAndConditions from "../../components/auth/TermsAndConditions";
import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX } from "../../utils/constants";
import { validate, clean } from "rut.js";
import { useConfigContext } from "../../contexts/ConfigContext";
import CustomAlert from "../../components/shared/CustomAlert";
import Loader from "../../components/shared/Loader";

const RegisterScreen = () => {
  const { authLoading, authError } = useConfigContext();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      rut: "",
    },
  });

  let password = watch("password");
  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShow(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShow(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const rutIsValid = (rut: string) => {
    return validate(clean(rut));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          globalStyles.formContainer,
          { paddingBottom: keyboardShow ? 280 : 10 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Controller
          control={control}
          name="firstName"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <CustomTextInput
              placeholder="Nombre"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Campo requerido",
            minLength: {
              value: 2,
              message: "Mínimo requerido: 2 caracteres",
            },
          }}
        />

        <Controller
          control={control}
          name="lastName"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <CustomTextInput
              placeholder="Apellido"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Campo requerido",
            minLength: {
              value: 2,
              message: "Mínimo requerido: 2 caracteres",
            },
          }}
        />

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
            pattern: {
              value: EMAIL_REGEX,
              message: "El formato del correo es incorrecto",
            },
          }}
        />

        <Controller
          control={control}
          name="phone"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <CustomTextInput
              placeholder="Telefono"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Campo requerido",
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
              error={error}
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Campo requerido",
            minLength: {
              value: 6,
              message: "La contraseña debe tener entre 6 y 20 caracteres",
            },
            maxLength: {
              value: 20,
              message: "La contraseña debe tener entre 6 y 20 caracteres",
            },
          }}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <CustomTextInput
              placeholder="Repetir Contraseña"
              error={error}
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Campo requerido",
            validate: (value) =>
              value === password ||
              "Las contraseñas no coinciden. Intenta nuevamente",
          }}
        />

        <Controller
          control={control}
          name="rut"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <CustomTextInput
              placeholder="RUT"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Campo requerido",
            validate: (value) => rutIsValid(value) || "El RUT no es valido",
          }}
        />
        <View style={[globalStyles.flexColumn, globalStyles.flexCenter]}>
          {authLoading ? (
            <Loader />
          ) : (
            <RegisterButton
              title="Registrarme en Fork"
              handleSubmit={handleSubmit}
            />
          )}
          <TermsAndConditions />
        </View>

        {authError.length > 0 && <CustomAlert text={authError} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
