import { Text, ScrollView, StyleSheet, Image, View } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import ProductLabel from "../shared/ProductLabel";
import { formatPrice } from "../../utils/formatText";
import ItemsSection from "./ItemsSection";
import ProductPriceAndCart from "./ProductPriceAndCart";
import { useCartContext } from "../../contexts/CartContext";

const PackMenu = ({ title, image, unitPriceReal, sku }: any) => {
  const { cart } = useCartContext();
  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        cart.productsQuantity > 0
          ? { paddingBottom: 80 }
          : { paddingBottom: 20 },
      ]}
    >
      <ProductLabel isPack />
      <Text style={[theme.textVariants.modalTitle, styles.title]}>{title}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={[theme.textVariants.price, styles.price]}>
        {formatPrice(unitPriceReal)}
      </Text>
      <ItemsSection title="Elige tu plato" />
      <ItemsSection title="Elige tu postre" />
      <ProductPriceAndCart unitPriceReal={unitPriceReal} sku={sku} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 65,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100%",
    backgroundColor: theme.colors.background,
  },
  title: {
    marginTop: theme.spacing.xs,
    textAlign: "center",
    width: "80%",
  },
  image: {
    marginTop: theme.spacing.m,
    height: 240,
    width: "85%",
    borderRadius: 100,
  },
  price: {
    fontWeight: "bold",
    marginTop: theme.spacing.xl,
    marginBottom: "15%",
  },
  checkboxSectionContainer: {
    width: "100%",
    marginTop: theme.spacing.xs,
  },
  checkboxSectionTitle: {
    width: "100%",
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
  },
});

export default PackMenu;
