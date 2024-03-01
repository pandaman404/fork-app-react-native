import { View, Text, StyleSheet, Image, Platform } from "react-native";
import React, { useMemo } from "react";
import { Button, Overlay } from "react-native-elements";
import { theme } from "../../styles/theme";
import PedidoExitosoReparto from "../../assets/PedidoExitosoReparto.svg";
import PedidoExitosoRetiro from "../../assets/PedidoExitosoRetiro.svg";
import DotsBackground from "../../assets/bg_dots_1.png";
import { primaryButtonStyles } from "../../styles/buttons";
import { windowHeight } from "../../styles/global";

const OrderCompletedModal = ({
  visible,
  toggleCompletedOrderModal,
  showCurrentDelivery,
  config,
  navigation,
}: any) => {
  const { navigate } = navigation;
  let delivery = useMemo(() => showCurrentDelivery(), [config]);

  const handleSubmit = async () => {
    toggleCompletedOrderModal();
    navigate("HomeScreen", "FeaturedScreen");
    // setTimeout(() => navigate("HomeScreen", "FeaturedScreen"), 200);
  };

  return (
    <Overlay isVisible={visible} overlayStyle={styles.modalContainer}>
      <Image source={DotsBackground} style={styles.dotsBackground} />
      <Text style={[theme.textVariants.modalTitle, styles.title]}>
        ¡Pedido Realizado!
      </Text>
      {config.delivery !== "DELIVERY" ? (
        <Text
          style={[
            theme.textVariants.sectionTitle,
            styles.address,
            { bottom: Platform.OS === 'ios' ? 0 : 20 }]}>
          Te esperamos en{" "}
          <Text style={styles.addressBold}>{delivery.name}</Text>
        </Text>
      ) : (
        <Text style={[
          theme.textVariants.sectionTitle,
          styles.address,
          { bottom: Platform.OS === 'android' ? 20 : -5 }
        ]}>
          Fork lo lleva a{" "}
          <Text style={styles.addressBold}>{delivery.name}</Text>
        </Text>
      )}

      {config.delivery === "DELIVERY" ? (
        <PedidoExitosoReparto style={styles.icon} />
      ) : (
        <PedidoExitosoRetiro style={styles.icon} />
      )}
      <Text style={[theme.textVariants.bodyVariant, styles.info]}>
        Te enviamos tu información al correo que nos diste.
      </Text>
      <View style={styles.navButtonContainer}>
        <Button
          title="Voy a por el"
          onPress={() => handleSubmit()}
          containerStyle={primaryButtonStyles.container}
          buttonStyle={primaryButtonStyles.button}
          titleStyle={[theme.textVariants.button, primaryButtonStyles.text]}
        />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: theme.colors.background,
    width: "90%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dotsBackground: {
    width: "100%",
    position: "absolute",
    top: 1,
    transform: [{ scaleX: 1.05 }],
  },
  title: {
    marginTop: "20%",
  },
  icon: {
    transform: [{ scale: 0.85 }],
  },
  address: {
    textAlign: "center",
  },
  addressBold: {
    fontWeight: "bold",
  },
  info: {
    color: theme.colors.secondaryVariant,
    textAlign: "center",
    marginTop: theme.spacing.s,
    marginBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  navButtonContainer: {
    marginBottom: theme.spacing.s,
  },
});

export default OrderCompletedModal;
