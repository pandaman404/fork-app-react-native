import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { Product } from "fork-business-library";
import { theme } from "../../styles/theme";

const SectionFooter = ({ section: { data: products } }: any) => {
  const immediateConsumption = products.some(
    (product: Product) => (product.immediateConsumption = true)
  );

  if (immediateConsumption) {
    return (
      <Text
        style={[theme.textVariants.bodyVariant3, styles.immediateConsumption]}
      >
        (*) Productos de consumo inmediato deben retirarse el mismo día de la
        compra.
      </Text>
    );
  }

  return <View style={styles.other} />;
};

const styles = StyleSheet.create({
  immediateConsumption: {
    paddingHorizontal: theme.spacing.xs,
    color: theme.colors.foregroundVariant,
    marginBottom: theme.spacing.xxxl,
    paddingBottom: Platform.OS === 'ios' ? 40 : 0
  },
  other: {
    marginBottom: theme.spacing.xxxl,
  },
});

export default SectionFooter;
