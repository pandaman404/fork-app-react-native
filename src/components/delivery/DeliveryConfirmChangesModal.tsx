import { View, Text, StyleSheet, Image } from "react-native";
import { Button, Overlay } from "react-native-elements";
import React from "react";
import { theme } from "../../styles/theme";
import DeliveryIcon from "../../assets/delivery.svg";
import StoreIcon from "../../assets/retiro.svg";
import DotsBackground from "../../assets/bg_dots_1.png";
import { primaryButtonStyles } from "../../styles/buttons";
import { useDeliveryContext } from "../../contexts/DeliveryContext";
import Loader from "../shared/Loader";

const DeliveryConfirmChangesModal = () => {
  const {
    deliverySelectionModal,
    updatingDeliveryConfig,
    closeDeliveryModal,
    saveChanges,
  } = useDeliveryContext();
  const { visible, data } = deliverySelectionModal;

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={updatingDeliveryConfig ? undefined : closeDeliveryModal}
      overlayStyle={styles.modalContainer}
    >
      <Image source={DotsBackground} style={styles.dotsBackground} />
      {data.address ? (
        <StoreIcon
          style={styles.icon}
          height={65}
          width={130}
          fill={theme.colors.primary}
        />
      ) : (
        <DeliveryIcon
          style={styles.icon}
          height={65}
          width={130}
          fill={theme.colors.primary}
        />
      )}
      <Text style={[theme.textVariants.title, styles.title]}>¡Entendido!</Text>
      <Text style={[theme.textVariants.title, styles.title]}>
        {data.address ? "Retiras en" : "Fork lo lleva a"} {`"${data.name}"`}
      </Text>
      <View style={styles.divider} />
      <Text style={[theme.textVariants.bodyVariant, styles.address]}>
        {data.address
          ? data.address +
            " Santiago\n" +
            "Hoy o mañana entre 08:00 y 21:30 hrs."
          : data.streetAndNumber + " Santiago"}
      </Text>
      {updatingDeliveryConfig ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : (
        <Button
          title="Elegir Productos"
          onPress={() => saveChanges("DeliverySelection", data)}
          containerStyle={primaryButtonStyles.container}
          buttonStyle={primaryButtonStyles.button}
          titleStyle={[theme.textVariants.button, primaryButtonStyles.text]}
        />
      )}
    </Overlay>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: theme.colors.background,
    width: "80%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: theme.spacing.l,
  },
  dotsBackground: {
    width: "100%",
    position: "absolute",
    top: 1,
    transform: [{ scaleX: 1.06 }],
  },
  icon: {
    marginTop: "10%",
    marginBottom: theme.spacing.xs,
    transform: [{ scale: 0.9 }],
  },
  title: {
    marginBottom: theme.spacing.xs,
    fontWeight: "bold",
  },
  divider: {
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: theme.colors.secondary,
    marginVertical: theme.spacing.s,
  },
  address: {
    color: theme.colors.secondaryVariant,
    marginBottom: theme.spacing.l,
    marginHorizontal: theme.spacing.xs,
    textAlign: "center",
  },
  loaderContainer: {
    height: 35,
  },
});

export default DeliveryConfirmChangesModal;
