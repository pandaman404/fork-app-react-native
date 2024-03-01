import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import { Discount } from "fork-business-library";

const ProfileDiscountItem = (discount: Discount) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.discountValuesContainer}>
        <Text style={theme.textVariants.body}>{discount.name}</Text>
        <Text style={[theme.textVariants.bodyVariant2, styles.discountDesc]}>
          {discount.description}
        </Text>
      </View>
      <View style={styles.discountDisclaimerContainer}>
        {discount.disclaimer.length > 0 ? (
          <Text style={[theme.textVariants.bodyVariant2, styles.discountDesc]}>
            {discount.disclaimer}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: theme.spacing.m,
    width: "100%",
  },
  discountValuesContainer: {
    padding: theme.spacing.l,
    marginVertical: theme.spacing.xs,
    shadowColor: theme.colors.secondaryVariant,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    borderWidth: 1,
    borderColor: theme.colors.secondaryVariant2,
  },
  discountDesc: {
    color: theme.colors.secondaryVariant,
  },
  discountDisclaimerContainer: {
    width: "95%",
    marginLeft: theme.spacing.xs,
  },
});

export default ProfileDiscountItem;
