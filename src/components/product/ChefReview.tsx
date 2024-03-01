import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useCartContext } from "../../contexts/CartContext";
import { theme } from "../../styles/theme";
import ChefReviewBackground from "../../assets/ic_product_chef_bg.svg";

const ChefReview = () => {
  const { cart } = useCartContext();
  return (
    <View style={styles.container}>
      <ChefReviewBackground style={styles.chefReviewBackground} />
      <View
        style={
          cart.productsQuantity > 0
            ? [styles.chefReviewText, { paddingBottom: 90 }]
            : [styles.chefReviewText, { paddingTop: 10, paddingBottom: 20 }]
        }
      >
        <Text style={[theme.textVariants.title, styles.chefReviewTitle]}>
          Chef Fork
        </Text>
        <Text style={[theme.textVariants.bodyVariant, styles.chefReviewDesc]}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam
          ullam, laudantium, fugit et, enim autem similique ea molestiae quae
          dolores minima! Sint voluptate Lorem ipsum dolor, sit amet consectetur
          ullam, laudantium, fugit et, enim autem similique ea molestiae quae
          dolores minima! Sint voluptate Lorem ipsum dolor, sit amet consectetur
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "25%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 2,
    bottom: 0,
    backgroundColor: "#e4e3e3",
  },
  chefReviewBackground: {
    position: "absolute",
    height: 300,
    width: 500,
    transform: [{ scaleX: 1.5 }],
    zIndex: 1,
    top: "-20%",
  },
  chefReviewText: {
    zIndex: 2,
    width: "90%",
    bottom: 0,
  },
  chefReviewTitle: {
    marginBottom: theme.spacing.s,
  },
  chefReviewDesc: {
    textAlign: "justify",
  },
});

export default ChefReview;
