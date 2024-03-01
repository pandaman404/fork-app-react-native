import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import { useCartContext } from "../../contexts/CartContext";
import { theme } from "../../styles/theme";
import { formatPrice } from "../../utils/formatText";

const DiscountRadioButton = ({
  name,
  code,
  amount,
  type,
  checked,
  id,
  toggleRadioButtons,
}: any) => {
  const { cart } = useCartContext();

  return (
    <View>
      <CheckBox
        title={
          <View style={styles.checkboxTextContainer}>
            <View style={styles.discountRow1}>
              <Text
                style={[theme.textVariants.bodyVariant, styles.discountName]}
              >
                {name.substring(0, 20)}
                {name.length > 20 && "..."}
              </Text>
              <Text
                style={[theme.textVariants.bodyVariant, styles.discountValue]}
              >
                {type !== "NINGUNO"
                  ? `-${formatPrice(cart.totalDescuentos)}`
                  : `-${formatPrice(0)}`}
              </Text>
            </View>
            <View style={styles.discountRow2}>
              {type === "NINGUNO" ? (
                <View style={styles.noDiscount} />
              ) : (
                <Text
                  style={[theme.textVariants.bodyVariant2, styles.discountCode]}
                >
                  {code}
                </Text>
              )}
            </View>
          </View>
        }
        checkedIcon={
          <Icon
            name="radio-button-checked"
            type="material"
            color={theme.colors.primary}
            size={28}
            style={styles.checkboxIcon}
          />
        }
        uncheckedIcon={
          <Icon
            name="radio-button-unchecked"
            type="material"
            color={theme.colors.secondaryVariant}
            size={28}
            style={styles.checkboxIcon}
          />
        }
        checkedColor={theme.colors.primary}
        containerStyle={styles.checkboxContainer}
        checked={checked}
        onPress={() => toggleRadioButtons(id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxIcon: {},
  checkboxContainer: {
    backgroundColor: theme.colors.secondary,
    padding: 0,
    borderWidth: 0,
    marginBottom: theme.spacing.l,
  },
  checkboxTextContainer: {
    width: "90%",
    marginLeft: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondaryVariant2,
    top: 15,
  },
  discountRow1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  discountRow2: {},
  discountName: {
    color: theme.colors.foreground,
  },
  discountCode: {
    color: theme.colors.secondaryVariant,
    marginBottom: theme.spacing.m,
  },
  discountValue: {},
  noDiscount: {
    height: 25,
  },
});

export default DiscountRadioButton;
