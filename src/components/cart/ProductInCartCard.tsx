import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ItemQuantityButton from "./ItemQuantityButton";
import { theme } from "../../styles/theme";
import { CartProduct } from "fork-business-library";
import { formatPrice } from "../../utils/formatText";
import ProductLabel from "../shared/ProductLabel";
import RandomProductFrame from "../shared/RandomProductFrame";

const ProductInCartCard = ({
  thumbnail,
  name,
  price,
  quantity,
  sku,
  canAddMore,
  dynamicPack,
  packProducts,
}: CartProduct) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: thumbnail,
          }}
          style={styles.image}
        />
        <RandomProductFrame imageStyles={styles.borderImage} />
      </View>
      <View style={styles.textContainer}>
        {dynamicPack && (
          <View style={styles.productLabelContainer}>
            <ProductLabel text={dynamicPack.name} />
          </View>
        )}
        <Text style={[theme.textVariants.body, styles.name]}>{name}</Text>
        {dynamicPack && (
          <View style={styles.packContainer}>
            {packProducts.map((item) => {
              return (
                <Text
                  style={[theme.textVariants.bodyVariant, styles.packItem]}
                  key={item.sku}
                >
                  {`${item.quantity} ${item.name}`}
                </Text>
              );
            })}
          </View>
        )}
        <Text style={[theme.textVariants.bodyVariant2, styles.price]}>
          {formatPrice(price)}
        </Text>
      </View>

      <ItemQuantityButton
        sku={sku}
        quantity={quantity}
        canAddMore={canAddMore}
        packProducts={packProducts}
        name={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 100,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
  imageContainer: {
    maxHeight: 100,
  },
  image: {
    height: "80%",
    maxHeight: 80,
    width: 80,
    borderRadius: 50,
  },
  borderImage: {
    tintColor: theme.colors.foreground,
    position: "absolute",
    height: "80%",
    width: 80,
    transform: [{ scaleY: 1.01 }],
    zIndex: 2,
  },
  textContainer: {
    flexGrow: 1,
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  name: {
    color: theme.colors.background,
  },
  price: {
    color: theme.colors.background,
  },
  packContainer: {
    marginVertical: 3,
  },
  packItem: {
    color: theme.colors.secondaryVariant,
  },
  productLabelContainer: {
    marginVertical: theme.spacing.xs,
  },
});

export default ProductInCartCard;
