import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { theme } from "../../styles/theme";
import { CheckBox, Icon } from "react-native-elements";
import LogoOneClick from "../../assets/logo-webpay-oneclick.svg";
import LogoWebpay from "../../assets/logo-webpay-plus.svg";
import LogoSodexo from "../../assets/logo-sodexo.svg";
import LogoAmipass from "../../assets/logo-amipass.png";

const PaymentRadioButton = ({
  type,
  checked,
  togglePaymentRadioButtons,
  id,
  disabled,
  oneclickCard,
}: any) => {

  // useEffect(() => {
  //   console.log('oneclickCard', oneclickCard)
  // }, [oneclickCard])

  return (
    <View>
      <CheckBox
        title={
          <View style={styles.checkboxTextContainer}>
            <View style={styles.paymentCol1}>
              <Text
                style={[
                  theme.textVariants.bodyVariant,
                  disabled
                    ? { color: theme.colors.secondaryVariant }
                    : { color: theme.colors.foreground },
                ]}
              >
                {type === "oneclick"
                  ? "Webpay OneClick"
                  : type === "webpay"
                    ? "Webpay Plus"
                    : type === "amipass"
                      ? "amiPASS"
                      : type === "sodexo"
                        ? "Sodexo"
                        : null}
              </Text>
              <Text
                style={[
                  theme.textVariants.bodyVariant2,
                  styles.paymentDescription,
                  disabled
                    ? { color: theme.colors.secondaryVariant }
                    : { color: theme.colors.foreground },
                ]}
              >
                {type === "oneclick"
                  ? oneclickCard
                    ? oneclickCard
                    : "Agrega una tarjeta de crédito o débito para pagar con Webpay OneClick."
                  : type === "webpay"
                    ? "Paga online con tarjeta de débito o crédito."
                    : type === "amipass"
                      ? "Paga online con amiPASS."
                      : type === "sodexo"
                        ? "Paga online con Sodexo."
                        : null}
              </Text>
            </View>
            <View style={styles.paymentCol2}>
              {type === "oneclick" ? (
                <LogoOneClick
                  height={40}
                  width={80}
                  style={styles.paymentLogoSvg}
                />
              ) : type === "webpay" ? (
                <LogoWebpay
                  height={50}
                  width={110}
                  style={[styles.paymentLogoSvg, { marginLeft: "15%" }]}
                />
              ) : type === "amipass" ? (
                <Image source={LogoAmipass} style={styles.paymentLogoImg} />
              ) : type === "sodexo" ? (
                <LogoSodexo
                  height={40}
                  width={80}
                  style={styles.paymentLogoSvg}
                />
              ) : null}
            </View>
          </View>
        }
        checkedIcon={
          <Icon
            name="radio-button-checked"
            type="material"
            color={theme.colors.primary}
            size={28}
            style={styles.checkboxIcon}
          />
        }
        uncheckedIcon={
          <Icon
            name="radio-button-unchecked"
            type="material"
            color={theme.colors.secondaryVariant}
            size={28}
            style={styles.checkboxIcon}
          />
        }
        checkedColor={theme.colors.primary}
        containerStyle={styles.checkboxContainer}
        checked={checked}
        onPress={() => togglePaymentRadioButtons(id)}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxIcon: {},
  checkboxContainer: {
    backgroundColor: theme.colors.secondary,
    padding: 0,
    borderWidth: 0,
    marginBottom: theme.spacing.l,
  },
  checkboxTextContainer: {
    width: "90%",
    marginLeft: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondaryVariant2,
    flexDirection: "row",
    justifyContent: "space-between",
    top: 15,
  },
  paymentCol1: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",
  },
  paymentCol2: {},
  paymentName: {},
  paymentDescription: {
    // color: theme.colors.foreground,
    marginBottom: theme.spacing.m,
  },
  paymentLogoSvg: {},
  paymentLogoImg: {
    height: 20,
    width: 100,
  },
});

export default PaymentRadioButton;
