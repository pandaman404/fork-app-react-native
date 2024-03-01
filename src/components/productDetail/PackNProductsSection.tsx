import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import { useCartContext } from "../../contexts/CartContext";
import ProductLabel from "../shared/ProductLabel";
import { useConfigContext } from "../../contexts/ConfigContext";
import useFetchProductDetails from "../../hooks/useFetchProductDetail";
import Loader from "../shared/Loader";
import { formatPrice, capitalizeText } from "../../utils/formatText";
import ProductSlider from "../singleProduct/ProductSlider";
import PackNProductsButton from "../packs/PackNProductsButton";
import AddPackToCart from "../packs/AddPackToCart";

const PackNProductsSection = ({ productId, packType }: any) => {
  const { cart } = useCartContext();
  const { config } = useConfigContext();
  const {
    product,
    packNProductsSection,
    decreaseItemQuantity,
    increaseItemQuantity,
    preparePackToCart,
  } = useFetchProductDetails(productId, config.storeId);

  if (!product || !packNProductsSection) {
    return <Loader />;
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        cart.productsQuantity > 0
          ? { paddingBottom: 80 }
          : { paddingBottom: 20 },
      ]}
    >
      {packType && <ProductLabel text={packType.name} />}
      <Text style={[theme.textVariants.modalTitle, styles.title]}>
        {product.title}
      </Text>
      {product.pictures.length > 0 ? (
        <ProductSlider pictures={product.pictures} />
      ) : null}
      <Text style={[theme.textVariants.price, styles.priceSubtitle]}>
        {formatPrice(product.price)}
      </Text>
      <Text style={[theme.textVariants.bodyVariant, styles.desc]}>
        Elije tus preferidos
      </Text>
      <View style={styles.buttonSectionContainer}>
        <Text style={[theme.textVariants.body, styles.buttonSectionTitle]}>
          {capitalizeText(packNProductsSection.title)}
        </Text>
        {packNProductsSection.items.map((item: any) => {
          return (
            <PackNProductsButton
              {...item}
              key={item.sku}
              decreaseItemQuantity={decreaseItemQuantity}
              increaseItemQuantity={increaseItemQuantity}
            />
          );
        })}
      </View>
      <View style={styles.priceAndCartContainer}>
        <Text style={[theme.textVariants.price, styles.price]}>
          {formatPrice(product.price)}
        </Text>
        <AddPackToCart
          packTypeName={"N_DISTINTOS"}
          data={packNProductsSection}
          preparePackToCart={preparePackToCart}
        />
      </View>
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
  priceSubtitle: {
    fontWeight: "bold",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.m,
  },
  desc: {
    marginBottom: "5%",
  },
  buttonSectionContainer: {
    width: "100%",
    marginTop: theme.spacing.m,
  },
  buttonSectionTitle: {
    width: "100%",
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
  },
  priceAndCartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.s,
    width: "90%",
  },
  price: {
    fontWeight: "bold",
  },
});

export default PackNProductsSection;
