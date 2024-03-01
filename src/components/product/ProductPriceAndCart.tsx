import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AddToCartButton from "../shared/AddToCartButton";
import { formatPrice } from "../../utils/formatText";
import { theme } from "../../styles/theme";

const ProductPriceAndCart = ({ unitPriceReal, sku }: any) => {
  return (
    <View style={styles.container}>
      <Text style={[theme.textVariants.price, styles.price]}>
        {formatPrice(unitPriceReal)}
      </Text>
      <AddToCartButton sku={sku} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.l,
    width: "90%",
  },
  price: {
    fontWeight: "bold",
  },
});

export default ProductPriceAndCart;
