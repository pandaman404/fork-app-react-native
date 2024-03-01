import { Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import ProductSlider from "./ProductSlider";
import InfoAlert from "../shared/InfoAlert";
import ProductTags from "./ProductTags";
import ProductPriceAndCart from "./ProductPriceAndCart";
import ChefReview from "./ChefReview";

const SingleProduct = ({ title, subtitle, unitPriceReal, image, sku }: any) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={[theme.textVariants.modalTitle, styles.title]}>{title}</Text>
      <Text style={[theme.textVariants.sectionTitle, styles.subtitle]}>
        {subtitle}
      </Text>
      <ProductSlider image={image} />
      <ProductPriceAndCart sku={sku} unitPriceReal={unitPriceReal} />
      <InfoAlert text="Producto de consumo inmediato: retíralo el mismo día de la compra" />
      <Text style={[theme.textVariants.bodyVariant, styles.desc]}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto
        alias eius nemo ipsam voluptatum nisi sunt exercitationem dicta nobis
        voluptatem! Lorem ipsum dolor.
      </Text>
      <ProductTags />
      <ChefReview />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100%",
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
    bottom: 40,
    color: theme.colors.secondaryVariant1,
  },
  desc: {
    width: "90%",
    textAlign: "justify",
    marginBottom: theme.spacing.l,
  },
});

export default SingleProduct;
