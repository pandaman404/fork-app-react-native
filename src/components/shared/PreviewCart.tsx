import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import NavButton from "./NavButton";
import { theme } from "../../styles/theme";
import { useCartContext } from "../../contexts/CartContext";
import { formatPrice } from "../../utils/formatText";
import { windowHeight } from "../../styles/global";

const PreviewCart = ({ navigate }: any) => {
  const { cart } = useCartContext();

  return (
    <View
      style={[
        styles.container,
        {
          bottom: Platform.OS === "ios" ? (windowHeight <= 667 ? 0 : "4%") : 0,
        },
      ]}
    >
      <Text style={[theme.textVariants.bodyVariant, styles.title]}>
        Tu Canasto
      </Text>
      <Text style={[theme.textVariants.bodyVariant2, styles.cartValue]}>
        {`${cart.productsQuantity} artículo${
          cart.productsQuantity > 1 ? "s" : ""
        } • ${formatPrice(cart.totalCarro)}`}
      </Text>
      <View style={styles.buttonContainer}>
        <NavButton
          title="Ver Canasto"
          nestedNavigator="CheckoutStacks"
          screenName="CartScreen"
          navigate={navigate}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: "100%",
    backgroundColor: theme.colors.foreground,
    position: "absolute",
    zIndex: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: theme.colors.background,
    position: "absolute",
    bottom: 35,
    left: 15,
  },
  cartValue: {
    color: theme.colors.background,
    position: "absolute",
    bottom: 10,
    left: 15,
  },
  buttonContainer: {
    maxWidth: 200,
    position: "absolute",
    right: 15,
    bottom: 10,
  },
});

export default PreviewCart;
