import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";
import DeliveryIcon from "../../assets/delivery.svg";
import StoreIcon from "../../assets/retiro.svg";
import NavButton from "../shared/NavButton";
import { useConfigContext } from "../../contexts/ConfigContext";

const DeliveryAddressCheckout = ({ navigate }: any) => {
  const { config, showCurrentDelivery } = useConfigContext();
  let delivery = useMemo(() => showCurrentDelivery(), [config]);
  return (
    <View
      style={[globalStyles.flexRow, globalStyles.flexCenter, styles.container]}
    >
      {config.delivery === "DELIVERY" ? (
        <DeliveryIcon
          height={65}
          width={130}
          fill={theme.colors.primary}
          style={styles.deliveryLogoPosition}
        />
      ) : config.delivery === "PICKUP" ? (
        <StoreIcon
          height={65}
          width={130}
          fill={theme.colors.primary}
          style={styles.pickupLogoPosition}
        />
      ) : null}

      <View style={styles.textContainer}>
        <Text style={[theme.textVariants.body, styles.title]}>
          {delivery.text}
        </Text>
        <Text style={[theme.textVariants.bodyVariant2, styles.address]}>
          {delivery.address}
        </Text>
      </View>
      {navigate && (
        <View style={styles.navButtonContainer}>
          <NavButton
            icon={{ type: "material", name: "keyboard-arrow-right", size: 24 }}
            navigate={navigate}
            nestedNavigator="DeliveryStacks"
            screenName="DeliveryScreen"
            iconButton
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondaryVariant2,
    width: "100%",
    minHeight: 90,
  },
  textContainer: {
    marginLeft: theme.spacing.l,
  },
  title: {
    color: theme.colors.foreground,
    marginBottom: theme.spacing.l,
  },
  address: {
    color: theme.colors.secondaryVariant,
    marginTop: -theme.spacing.l,
  },
  deliveryLogoPosition: {
    position: "absolute",
    left: "-2%",
  },
  pickupLogoPosition: {
    position: "absolute",
    left: "-8%",
  },
  navButtonContainer: {
    position: "absolute",
    right: 0,
  },
});

export default DeliveryAddressCheckout;
