import { View, Text, StyleSheet, Keyboard, Alert } from "react-native";
import React, { useState } from "react";
import { Button, Overlay } from "react-native-elements";
import DismissKeyboard from "../shared/DismissKeyboard";
import { theme } from "../../styles/theme";
import Loader from "../shared/Loader";
import { primaryButtonStyles } from "../../styles/buttons";
import CustomTextInput from "../shared/CustomTextInput";
import { Controller, useForm } from "react-hook-form";
import { updateUserData } from "../../api/user";
import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX } from "../../utils/constants";

const ProfileEditUserModal = ({
  visible,
  toggleProfileEditUserModal,
  user,
  updateUser,
  setShowCustomAlert,
  setCustomAlertMsg,
  setCustomAlertCode
}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: user.firstName,
      lastname: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  });

  const submitModal = async (data: any) => {
    Keyboard.dismiss();
    setIsLoading(true);
    const resp = await updateUserData(
      data.email,
      data.name,
      data.lastname,
      "+56" + data.phone
    );
    toggleProfileEditUserModal()
    if (resp) {
      updateUser(resp.email, resp.firstName, resp.lastName, resp.phone);
      setCustomAlertMsg("Tus datos han sido modificados correctamente")
      setShowCustomAlert(true)
      setCustomAlertCode('ok')
      setTimeout(() => {
        setShowCustomAlert(false)
      }, 3000);
      setIsLoading(false);
    } else {
      setCustomAlertMsg("No se pudo completar la edición")
      setShowCustomAlert(true)
      setCustomAlertCode('warning')
      setTimeout(() => {
        setShowCustomAlert(false)
      }, 3000);
      setIsLoading(false);
    }
  };

  return (
    <Overlay
      isVisible={visible}
      overlayStyle={styles.container}
      onBackdropPress={
        isLoading ? undefined : () => toggleProfileEditUserModal()
      }
    >
      <DismissKeyboard>
        <View>
          <Text style={[theme.textVariants.body, styles.title]}>
            Editar Perfil
          </Text>
          <View style={styles.inputContainer}>
            {/* nombre */}
            <Controller
              control={control}
              name="name"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  placeholder={user.firstName}
                  error={error}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              rules={{
                required: "Campo requerido",
                pattern: {
                  value: NAME_REGEX,
                  message: "El formato de nombre es incorrecto",
                },
                minLength: {
                  value: 2,
                  message: "Mínimo requerido: 2 caracteres",
                },
              }}
            />
            {/* apellido */}
            <Controller
              control={control}
              name="lastname"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  placeholder={user.lastName}
                  error={error}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              rules={{
                required: "Campo requerido",
                pattern: {
                  value: NAME_REGEX,
                  message: "El formato de nombre es incorrecto",
                },
                minLength: {
                  value: 2,
                  message: "Mínimo requerido: 2 caracteres",
                },
              }}
            />
            {/* email */}
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  placeholder={user.email}
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
            {/* telefono */}
            <Controller
              control={control}
              name="phone"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  placeholder={user.phone}
                  error={error}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              rules={{
                pattern: {
                  value: PHONE_REGEX,
                  message: "El formato de numero de telefono es incorrecto",
                },
              }}
            />
          </View>
          <View style={styles.submitContainer}>
            {isLoading ? (
              <Loader />
            ) : (
              <Button
                title="Guardar datos"
                containerStyle={[primaryButtonStyles.container, styles.submit]}
                buttonStyle={primaryButtonStyles.button}
                titleStyle={[
                  theme.textVariants.button,
                  primaryButtonStyles.text,
                ]}
                onPress={handleSubmit(submitModal)}
              />
            )}
          </View>
        </View>
      </DismissKeyboard>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    padding: theme.spacing.m,
  },
  title: {
    marginBottom: theme.spacing.m,
  },
  inputContainer: {
    marginBottom: theme.spacing.m,
  },
  submitContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  submit: {
    maxWidth: 190,
  },
});

export default ProfileEditUserModal;
