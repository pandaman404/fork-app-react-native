import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Overlay } from "react-native-elements";
import { theme } from "../../styles/theme";
import { Controller, useForm } from "react-hook-form";
import CustomTextInput from "./CustomTextInput";
import { primaryButtonStyles } from "../../styles/buttons";
import { useCartContext } from "../../contexts/CartContext";
import Loader from "./Loader";
import DismissKeyboard from "./DismissKeyboard";
import * as Analytics from 'expo-firebase-analytics';

const AddPromoCodeModal = ({ visible, toggleModal }: any) => {
  const { addPromoCode } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);

  const submitModal = async ({ promoCode }: any) => {
    Keyboard.dismiss();
    setIsLoading(true);
    await addPromoCode(promoCode);
    setIsLoading(false);
    toggleModal();
    Analytics.logEvent('add_promo_code_app', {
      promo_code: promoCode
    });
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      promoCode: "",
    },
  });

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={isLoading ? undefined : toggleModal}
      overlayStyle={styles.modalContainer}
    >
      <DismissKeyboard>
        <View>
          <Text style={[theme.textVariants.body, styles.title]}>
            Código Promo
          </Text>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="promoCode"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  placeholder="Código promo (opcional)"
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
          </View>
          <Text style={[theme.textVariants.bodyVariant2, styles.inputDesc]}>
            Incluye las letras, números y símbolos.
          </Text>
          <View style={styles.submitContainer}>
            {isLoading ? (
              <Loader />
            ) : (
              <Button
                title="Validar Código"
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
  modalContainer: {
    width: "85%",
    padding: theme.spacing.m,
  },
  title: {
    marginBottom: theme.spacing.m,
  },
  inputContainer: {
    marginBottom: theme.spacing.m,
  },
  inputDesc: {
    backgroundColor: theme.colors.background,
    color: theme.colors.secondaryVariant,
    textAlign: "right",
    position: "absolute",
    top: "52%",
    width: "100%",
  },
  submitContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  submit: {
    maxWidth: 190,
  },
});

export default AddPromoCodeModal;
