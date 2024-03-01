import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";

const ProductTags = ({ tags }: any) => {
  return (
    <View style={styles.tagsContainer}>
      {tags.map((tag: any, index: number) => {
        return (
          <View style={styles.tagItem} key={index}>
            <Image
              source={{
                uri: tag.image,
              }}
              style={styles.tagItemImg}
            />
            <Text style={[theme.textVariants.bodyVariant3, styles.tagItemText]}>
              {tag.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: theme.spacing.xl,
  },
  tagItem: {
    alignItems: "center",
    marginRight: theme.spacing.l,
  },
  tagItemImg: {
    height: 30,
    width: 30,
    tintColor: theme.colors.foregroundVariant,
  },
  tagItemText: {
    maxWidth: 70,
    textAlign: "center",
    marginTop: theme.spacing.xs,
    color: theme.colors.secondaryVariant,
  },
});

export default ProductTags;
