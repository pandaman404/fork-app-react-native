import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CartProduct } from "fork-business-library";
import React, { useCallback, useEffect } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductInCartCard from "../../components/cart/ProductInCartCard";
import ContinueButton from "../../components/checkout/ContinueButton";
import NavButton from "../../components/shared/NavButton";
import { useCartContext } from "../../contexts/CartContext";
import { useConfigContext } from "../../contexts/ConfigContext";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";
import { formatPrice } from "../../utils/formatText";
import * as Analytics from 'expo-firebase-analytics';

const CartScreen = ({ navigation }: any) => {
  const { user } = useConfigContext();
  const { cart } = useCartContext();
  const { goBack } = useNavigation();

  useEffect(() => {
    Analytics.logEvent('view_cart_app');
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (cart.productsQuantity === 0) {
        setTimeout(() => {
          goBack();
        }, 500);
      }
    }, [cart.productsQuantity])
  );

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.foreground}
      />
      <View
        style={[
          globalStyles.backgroundDark,
          globalStyles.flex1,
          styles.container,
        ]}
      >
        <View style={[globalStyles.flexRowSpaceBetween, styles.textContainer]}>
          <Text style={[theme.textVariants.bodyVariant2, styles.text]}>
            {`${cart.productsQuantity} artículo${cart.productsQuantity > 1 ? "s" : ""
              }`}
          </Text>
          <Text style={[theme.textVariants.bodyVariant2, styles.text]}>
            {cart.totalCarro && formatPrice(cart.totalCarro)}
          </Text>
        </View>
        <ScrollView contentContainerStyle={[globalStyles.windowWidth]}>
          {cart.products &&
            cart.products.map((product: CartProduct, index: number) => {
              return (
                <ProductInCartCard
                  {...product}
                  key={`${product.sku}_${index}`}
                />
              );
            })}
        </ScrollView>
        <View style={styles.buttonContainer}>
          {user.registered ? (
            <ContinueButton
              startNewOrder
              navigate={navigation.navigate}
              nextScreen={"CheckoutDeliveryScreen"}
              data={cart.products}
            />
          ) : (
            <NavButton
              title={"Hacer Pedido"}
              navigate={navigation.navigate}
              nestedNavigator="AuthScreen"
              screenName="LoginScreen"
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: theme.spacing.m,
  },
  textContainer: {
    width: "100%",
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  text: {
    color: theme.colors.background,
  },
  buttonContainer: {
    marginTop: theme.spacing.l,
    maxWidth: 190,
    marginBottom: Platform.OS === "ios" ? "5%" : 0,
  },
});

export default CartScreen;
