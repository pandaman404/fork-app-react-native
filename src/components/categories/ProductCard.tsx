import { Product } from "fork-business-library";
import React, { memo, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import AddToCartButton from "../shared/AddToCartButton";
import ProductLabel from "../shared/ProductLabel";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";
import { formatPrice } from "../../utils/formatText";
import GoToPackButton from "./GoToPackButton";
import RandomProductFrame from "../shared/RandomProductFrame";
import * as Analytics from 'expo-firebase-analytics';

interface Props {
  product: Product;
  navigation: any;
}

const ProductCard = ({ product, navigation }: Props) => {
  const {
    title,
    subtitle,
    image,
    unitPriceReal,
    immediateConsumption,
    isNew,
    isFeatured,
    stock,
    sku,
    id,
    packType,
  } = product;
  const { navigate } = navigation;

  const handleNavigate = () => {
    navigate("ProductDetailScreen", { ...product });
    Analytics.logEvent('order_detail_app', {
      product_id: product.id
    });
  }

  return (
    <TouchableWithoutFeedback
      onPress={handleNavigate}
    >
      <View style={[styles.card]}>
        <View style={[globalStyles.flex1, styles.textCard]}>
          <View style={styles.labelContainer}>
            {packType ? (
              <ProductLabel text={packType.name} />
            ) : isNew ? (
              <ProductLabel text="NUEVO" />
            ) : isFeatured ? (
              <ProductLabel text="DESTACADO" />
            ) : null}
          </View>
          <Text style={[theme.textVariants.body, styles.colorTitle]}>
            {title.substring(0, 40)}
            {title.length > 40 && "..."}
            {immediateConsumption ? (
              <Text style={{ color: theme.colors.primary }}>*</Text>
            ) : null}
          </Text>
          <Text style={[theme.textVariants.bodyVariant2, styles.colorSubTitle]}>
            {subtitle}
          </Text>
          {stock < 20 && (
            <Text style={[theme.textVariants.bodyVariant3, styles.lastUnits]}>
              ¡Últimas unidades!
            </Text>
          )}
          <Text style={[theme.textVariants.bodyVariant, styles.price]}>
            {formatPrice(unitPriceReal)}
          </Text>
        </View>
        <View style={[globalStyles.flex1]}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <RandomProductFrame imageStyles={styles.borderImage} />
          <View style={styles.buttonPosition}>
            {!packType ? (
              <AddToCartButton sku={sku} title={title} />
            ) : (
              <GoToPackButton id={id} packType={packType} navigate={navigate} />
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 160,
    width: "100%",
    flexDirection: "row",
    marginBottom: theme.spacing.xxl,
  },
  textCard: {
    paddingVertical: theme.spacing.xs,
  },
  colorTitle: {
    color: theme.colors.foreground,
  },
  colorSubTitle: {
    color: theme.colors.secondaryVariant,
    marginBottom: theme.spacing.l,
  },
  labelContainer: {
    maxHeight: 18,
    maxWidth: "50%",
    marginBottom: theme.spacing.xs,
  },
  lastUnits: {
    color: theme.colors.secondaryVariant1,
    marginBottom: theme.spacing.xs,
  },
  price: {
    color: theme.colors.foregroundVariant,
  },
  image: {
    flex: 1,
  },
  borderImage: {
    position: "absolute",
    flex: 1,
    zIndex: 2,
    top: -1,
    left: -1.5,
    transform: [{ scaleY: 1.01 }],
    tintColor: theme.colors.background,
  },
  buttonPosition: {
    zIndex: 3,
    position: "absolute",
    right: "10%",
    bottom: "12%",
  },
});

export default memo(ProductCard);
