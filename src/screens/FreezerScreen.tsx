import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import ScanQRButton from "../components/freezer/ScanQRButton";
import { theme } from "../styles/theme";

const FreezerScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://media-exp1.licdn.com/dms/image/C4E0BAQEWT32vRR1qaw/company-logo_200_200/0/1533843312546?e=2159024400&v=beta&t=HuCo7yhJwvzP6NjQpYQsGugKhj3XPXSVi-kEfGI3LDw",
        }}
        style={styles.logo}
      />

      <View style={styles.lobby}>
        <Icon
          type="material-community"
          name="fridge-outline"
          color={theme.colors.primary}
          style={styles.lobbyLogo}
          size={32}
        />
        <Text style={styles.lobbyText}>Lobby</Text>
      </View>

      <Text style={[theme.textVariants.bodyVariant, styles.primaryText]}>
        Escanea el código QR del refrigerador y elige tus productos
      </Text>

      <ScanQRButton />

      <Text style={[theme.textVariants.bodyVariant2, styles.secondaryText]}>
        Para pedir delivery o retirar en tienda, visita:
      </Text>

      <View style={styles.mancha}>
        <Text style={styles.textMancha}>Ir al Ecommerce</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: "15%",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    height: 160,
    width: 160,
  },
  lobby: {
    bottom: theme.spacing.xxl,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "2%",
  },
  lobbyLogo: {},
  lobbyText: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  primaryText: {
    color: theme.colors.foregroundVariant,
    textAlign: "center",
    marginBottom: "5%",
  },
  secondaryText: {
    color: theme.colors.foregroundVariant,
    textAlign: "center",
    position: "absolute",
    bottom: 150,
  },
  mancha: {
    position: "absolute",
    bottom: 0,
    height: 130,
    width: "100%",
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  textMancha: {
    color: theme.colors.background,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
});

export default FreezerScreen;
