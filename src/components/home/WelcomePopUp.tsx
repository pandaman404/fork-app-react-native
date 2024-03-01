import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Overlay } from "react-native-elements";
import { theme } from "../../styles/theme";
import RetiroIcon from "../../assets/retiro.svg";
import DeliveryIcon from "../../assets/delivery.svg";
import { useConfigContext } from "../../contexts/ConfigContext";

const WelcomePopUp = ({ navigate }: any) => {
  const [visible, setVisible] = useState(false);
  const { config, userLogOut } = useConfigContext();

  const navigateTo = (tab: any) => {
    setVisible(false);
    navigate("DeliveryStacks", {
      screen: "DeliveryScreen",
      params: {
        screen: tab,
      },
    });
  };

  useEffect(() => {
    if (config.isDefault && !userLogOut) {
      setTimeout(() => {
        setVisible(true);
      }, 800);
    }
  }, [config.isDefault]);

  return (
    <Overlay
      isVisible={visible}
      overlayStyle={styles.overlay}
      onBackdropPress={() => setVisible(false)}
    >
      <Text style={styles.welcomeTitle}>¡Bienvenido!</Text>
      <Text style={[styles.welcomeSubTitle]}>
        ¿Cómo entregaremos tu pedido?
      </Text>
      <Text style={[theme.textVariants.bodyVariant, styles.welcomeText]}>
        De acuerdo a tu elección, te mostraremos el stock disponible en tu
        tienda más cercana
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={[styles.button, styles.shadowLeft]}
          onPress={() => navigateTo("Fork lo lleva")}
        >
          <DeliveryIcon height={50} width={125} fill={theme.colors.primary} />
          <Text style={styles.buttonText}>fork {"\n"} lo lleva</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.shadowRight]}
          onPress={() => navigateTo("Retiro en tienda")}
        >
          <RetiroIcon height={50} width={122} fill={theme.colors.primary} />
          <Text style={styles.buttonText}>retiras {"\n"} en tienda</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

export default WelcomePopUp;

const styles = StyleSheet.create({
  overlay: {
    width: "90%",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  welcomeTitle: {
    textAlign: "center",
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  welcomeSubTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  welcomeText: {
    textAlign: "center",
    paddingHorizontal: theme.spacing.m,
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colors.background,
    width: "48%",
    paddingHorizontal: theme.spacing.s,
    paddingTop: theme.spacing.m,
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: theme.colors.secondaryVariant,
  },
  shadowLeft: {
    shadowOpacity: 0.4,
    shadowOffset: { width: -1.3, height: 2 },
    elevation: 5,
  },
  shadowRight: {
    shadowOpacity: 0.4,
    shadowOffset: { width: 1.5, height: 2 },
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    padding: 10,
  },
});
