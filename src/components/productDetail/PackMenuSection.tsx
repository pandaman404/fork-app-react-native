import { Text, ScrollView, StyleSheet, Image, View } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import ProductLabel from "../shared/ProductLabel";
import { formatPrice } from "../../utils/formatText";
import { useCartContext } from "../../contexts/CartContext";
import { useConfigContext } from "../../contexts/ConfigContext";
import useFetchProductDetails from "../../hooks/useFetchProductDetail";
import Loader from "../shared/Loader";
import ProductSlider from "../singleProduct/ProductSlider";
import AddPacksToCart from "../packs/AddPackToCart";
import PackMenuRadioButton from "../packs/PackMenuRadioButton";

const PackMenuSection = ({ productId, packType }: any) => {
  const { cart } = useCartContext();
  const { config } = useConfigContext();
  const { product, packMenuSections, checkItemInSection, preparePackToCart } =
    useFetchProductDetails(productId, config.storeId);

  if (!product || !packMenuSections) {
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
      {packMenuSections.map(
        ({ title, sectionIndex, items }: any, index: number) => {
          return (
            <View style={styles.packSectionContainer} key={index}>
              <Text style={[theme.textVariants.body, styles.packSectionTitle]}>
                {title}
              </Text>
              {items.map((item: any) => {
                return (
                  <PackMenuRadioButton
                    {...item}
                    key={item.sku}
                    sectionIndex={sectionIndex}
                    checkItemInSection={checkItemInSection}
                  />
                );
              })}
            </View>
          );
        }
      )}
      <View style={styles.priceAndCartContainer}>
        <Text style={[theme.textVariants.price, styles.price]}>
          {formatPrice(product.price)}
        </Text>
        <AddPacksToCart
          packTypeName={"MENU"}
          data={packMenuSections}
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
    marginBottom: "5%",
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
  packSectionContainer: {
    width: "100%",
    marginTop: theme.spacing.m,
  },
  packSectionTitle: {
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

export default PackMenuSection;
