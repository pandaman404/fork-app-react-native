import { StatusBar } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import { useCartContext } from "../../contexts/CartContext";
import PreviewCart from "../../components/shared/PreviewCart";
import SingleProductSection from "../../components/productDetail/SingleProductSection";
import PackMenuSection from "../../components/productDetail/PackMenuSection";
import PackNProductsSection from "../../components/productDetail/PackNProductsSection";

const ProductDetailScreen = ({ route, navigation }: any) => {
  const { id, packType, stock } = route.params;
  const { navigate } = navigation;
  const { cart } = useCartContext();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.foreground}
      />
      {packType === null ? (
        <SingleProductSection productId={id} stock={stock} />
      ) : packType && packType.code === "MENU" ? (
        <PackMenuSection productId={id} packType={packType} />
      ) : packType && packType.code === "N_DISTINTOS" ? (
        <PackNProductsSection productId={id} packType={packType} />
      ) : null}
      {cart.productsQuantity > 0 && <PreviewCart navigate={navigate} />}
    </>
  );
};

export default ProductDetailScreen;
