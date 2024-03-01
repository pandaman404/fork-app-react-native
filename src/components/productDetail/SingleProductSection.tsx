import { Text, StyleSheet, ScrollView, View, Platform } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import ProductSlider from "../singleProduct/ProductSlider";
import InfoAlert from "../shared/InfoAlert";
import ProductTags from "../singleProduct/ProductTags";
import ChefReview from "../singleProduct/ChefReview";
import AddToCartButton from "../../components/shared/AddToCartButton";
import { useConfigContext } from "../../contexts/ConfigContext";
import Loader from "../shared/Loader";
import useFetchProductDetails from "../../hooks/useFetchProductDetail";
import { formatPrice } from "../../utils/formatText";
import { windowHeight } from "../../styles/global";
import { useCartContext } from "../../contexts/CartContext";

const SingleProductSection = ({ productId, stock }: any) => {
  const { config } = useConfigContext();
  const { cart } = useCartContext();
  const { product } = useFetchProductDetails(productId, config.storeId);

  if (!product) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          cart.productsQuantity > 0
            ? { paddingBottom: 70 }
            : { paddingBottom: 0 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[theme.textVariants.modalTitle, styles.title]}>
          {product.title}
        </Text>
        <Text
          style={[
            theme.textVariants.sectionTitle,
            styles.subtitle,
            {
              bottom: Platform.OS === "ios" ? windowHeight <= 667 ? -10 : 0 : 30,
              marginBottom: Platform.OS === "ios" ? windowHeight <= 667 ? 40 : 20 : 0,
              paddingBottom: 3,
              paddingTop: 3
            },
          ]}
        >
          {product.subtitle}
        </Text>
        <ProductSlider pictures={product.pictures} />
        <View style={styles.priceAndCartContainer}>
          <Text style={[theme.textVariants.price, styles.price]}>
            {formatPrice(product.price)}
          </Text>
          <View style={styles.addToCartContainer}>
            {stock < 20 && (
              <Text style={[theme.textVariants.bodyVariant3, styles.lastUnits]}>
                ¡Últimas unidades!
              </Text>
            )}
            <AddToCartButton sku={product.sku} title={product.title} />
          </View>
        </View>
        {product.immediateConsumption && (
          <InfoAlert text="Producto de consumo inmediato: retíralo el mismo día de la compra" />
        )}
        <Text style={[theme.textVariants.bodyVariant, styles.desc]}>
          {product.description}
        </Text>
        {product.tags.length > 0 && <ProductTags tags={product.tags} />}
        {product.chefComment && <ChefReview comment={product.chefComment} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    paddingTop: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    // minHeight: "100%",
    backgroundColor: theme.colors.background,
  },
  title: {
    marginTop: theme.spacing.s,
    textAlign: "center",
    width: "80%",
  },
  subtitle: {
    textAlign: "center",
    width: "90%",
    // bottom: 0,
    color: theme.colors.secondaryVariant1,
  },
  desc: {
    width: "90%",
    textAlign: "justify",
    marginTop: theme.spacing.s,
    marginBottom: theme.spacing.xxl,
  },
  addToCartContainer: { position: "relative" },
  lastUnits: {
    position: "absolute",
    bottom: "100%",
    right: "15%",
    color: theme.colors.secondaryVariant1,
    marginBottom: theme.spacing.xs,
  },
  priceAndCartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.s,
    width: "90%",
  },
  price: {
    fontWeight: "bold",
  },
});

export default SingleProductSection;
