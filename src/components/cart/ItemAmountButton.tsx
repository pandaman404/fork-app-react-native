import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-native-elements";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import { useCartContext } from "../../contexts/CartContext";

const ItemAmountButton = ({ sku, quantity, packProducts = null }: any) => {
  const { addProductToCart, removeProductFromCart, isBusy } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [didMount, setDidMount] = useState(false);

  const product = {
    sku,
    quantity,
    pack:
      packProducts && packProducts.length > 0
        ? packProducts.map((product: any) => ({
            sku: product.sku,
            quantity: product.quantity,
          }))
        : null,
  };

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button
        type="clear"
        icon={{
          name: "minus",
          type: "entypo",
          size: 16,
          color: theme.colors.background,
        }}
        iconContainerStyle={styles.buttonContainer}
        onPress={async () => {
          setIsLoading(true);
          await removeProductFromCart(product);
          setIsLoading(false);
        }}
        disabled={isBusy}
      />
      {isLoading ? (
        <ActivityIndicator size={16} color={theme.colors.primary} />
      ) : (
        <Text style={[theme.textVariants.body, styles.text]}>{quantity}</Text>
      )}
      <Button
        type="clear"
        icon={{
          name: "plus",
          type: "entypo",
          size: 16,
          color: theme.colors.background,
        }}
        iconContainerStyle={styles.buttonContainer}
        onPress={async () => {
          setIsLoading(true);
          await addProductToCart(product);
          setIsLoading(false);
        }}
        disabled={isBusy}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: theme.colors.foreground,
    minWidth: 130,
    borderRadius: 30,
  },
  buttonContainer: {
    backgroundColor: theme.colors.secondaryVariant,
    borderRadius: 50,
    padding: 4,
  },
  text: {
    color: theme.colors.background,
  },
});

export default ItemAmountButton;
