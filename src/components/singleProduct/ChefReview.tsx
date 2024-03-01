import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useCartContext } from "../../contexts/CartContext";
import { theme } from "../../styles/theme";
import ChefReviewBackground from "../../assets/ic_product_chef_bg.svg";

const ChefReview = ({ comment }: any) => {
  return (
    <View style={styles.container}>
      <ChefReviewBackground style={styles.chefReviewBackground} />
      <View style={styles.chefReviewText}>
        <Text style={[theme.textVariants.title, styles.chefReviewTitle]}>
          Chef Fork
        </Text>
        <Text style={[theme.textVariants.bodyVariant, styles.chefReviewDesc]}>
          {comment}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
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
    paddingTop: 10,
    paddingBottom: theme.spacing.m,
  },
  chefReviewTitle: {
    color: theme.colors.foreground,
    marginBottom: theme.spacing.s,
  },
  chefReviewDesc: {
    textAlign: "justify",
  },
});

export default ChefReview;
