import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button, Overlay } from "react-native-elements";
import Loader from "../shared/Loader";
import { theme } from "../../styles/theme";
import {
  primaryButtonStyles,
  secondaryButtonStyles,
} from "../../styles/buttons";
import { useDeliveryContext } from "../../contexts/DeliveryContext";

const DeliveryMissingProductsModal = () => {
  const {
    missingProductsModal,
    updatingDeliveryConfig,
    closeMissingProductsModal,
    saveChanges,
  } = useDeliveryContext();

  const {
    visible,
    data: { missingProducts, checkedItem },
  } = missingProductsModal;
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={
        updatingDeliveryConfig ? undefined : closeMissingProductsModal
      }
      overlayStyle={styles.modalContainer}
    >
      <Text style={[theme.textVariants.modalTitleVariant, styles.title]}>
        Se perderán algunos artículos
      </Text>
      <Text style={[theme.textVariants.bodyVariant2, styles.desc]}>
        Los siguientes artículos están agotados para la dirección escogida:
      </Text>
      {missingProducts &&
        missingProducts.map((item: any, index: number) => {
          return (
            <Text
              style={[theme.textVariants.bodyVariant2, styles.lostProduct]}
              key={index}
            >
              - {item}
            </Text>
          );
        })}
      <View style={styles.buttonsContainer}>
        <Button
          title="Mejor No"
          type="outline"
          onPress={() => closeMissingProductsModal()}
          containerStyle={secondaryButtonStyles.container}
          buttonStyle={secondaryButtonStyles.button}
          titleStyle={[theme.textVariants.button, secondaryButtonStyles.text]}
        />
        {updatingDeliveryConfig ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : (
          <Button
            title="Ok!"
            onPress={() => saveChanges("MissingProducts", checkedItem)}
            containerStyle={[primaryButtonStyles.container, styles.extraMargin]}
            buttonStyle={primaryButtonStyles.button}
            titleStyle={[theme.textVariants.button, primaryButtonStyles.text]}
          />
        )}
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.l,
    width: "80%",
  },
  title: {
    color: theme.colors.foreground,
    marginBottom: theme.spacing.s,
    textAlign: "center",
  },
  desc: {
    color: theme.colors.secondaryVariant,
  },
  lostProduct: {
    color: theme.colors.secondaryVariant,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: theme.spacing.m,
  },
  extraMargin: {
    marginLeft: theme.spacing.s,
  },
  loaderContainer: {
    marginLeft: theme.spacing.l,
    marginRight: theme.spacing.xl,
  },
});

export default DeliveryMissingProductsModal;
