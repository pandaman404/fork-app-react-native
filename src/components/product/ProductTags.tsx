import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import { globalStyles } from "../../styles/global";

const ProductTags = () => {
  return (
    <View style={styles.tagsContainer}>
      <View style={styles.tagItem}>
        <Image
          source={{
            uri: "https://s3-sa-east-1.amazonaws.com/corpora-fork/tags/Receta+vegana%403x.png",
          }}
          style={styles.tagItemImg}
        />
        <Text style={[theme.textVariants.bodyVariant3, styles.tagItemText]}>
          Receta Vegana
        </Text>
      </View>
      <View style={styles.tagItem}>
        <Image
          source={{
            uri: "https://s3-sa-east-1.amazonaws.com/corpora-fork/tags/Receta+vegana%403x.png",
          }}
          style={styles.tagItemImg}
        />
        <Text style={[theme.textVariants.bodyVariant3, styles.tagItemText]}>
          Receta Vegana
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
  },
  tagItem: {
    alignItems: "center",
    marginRight: theme.spacing.m,
  },
  tagItemImg: {
    height: 30,
    width: 30,
    tintColor: theme.colors.foregroundVariant,
  },
  tagItemText: {
    maxWidth: 70,
    textAlign: "center",
    color: theme.colors.secondaryVariant,
  },
});

export default ProductTags;
