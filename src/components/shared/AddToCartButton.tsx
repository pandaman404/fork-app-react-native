import React, { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useCartContext } from "../../contexts/CartContext";
import { theme } from "../../styles/theme";
import ItemQuantityButton from "../cart/ItemQuantityButton";

const AddToCartButton = ({ sku, title }: any) => {
  const {
    cart,
    getProductQuantityAndStatusInScreen,
    addProductToCart,
    isBusy,
  } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);

  const { quantity, canAddMore } = useMemo(
    () => getProductQuantityAndStatusInScreen(sku),
    [cart]
  );

  return (
    <>
      {quantity === 0 ? (
        <Button
          title={
            isLoading ? (
              <ActivityIndicator
                size={16}
                color={theme.colors.primary}
                style={styles.buttonLoader}
              />
            ) : (
              "Agregar"
            )
          }
          icon={
            isLoading
              ? undefined
              : {
                type: "material",
                name: "shopping-bag",
                color: theme.colors.background,
                size: 22,
              }
          }
          iconPosition="right"
          buttonStyle={styles.button}
          titleStyle={[theme.textVariants.button, styles.buttonTitle]}
          containerStyle={styles.buttonContainer}
          onPress={async () => {
            setIsLoading(true);
            await addProductToCart({ sku, quantity: 1, pack: null });
            setIsLoading(false);
          }}
          disabled={isBusy}
          disabledStyle={styles.disabledButton}
          disabledTitleStyle={styles.disabledTitleButton}
        />
      ) : (
        <ItemQuantityButton
          sku={sku}
          quantity={quantity}
          canAddMore={canAddMore}
          name={title}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.foreground,
    display: "flex",
    justifyContent: "flex-start",
    minHeight: 40,
  },
  buttonTitle: {
    color: theme.colors.background,
    textTransform: "uppercase",
    justifyContent: "center",
  },
  buttonContainer: {
    borderRadius: 30,
    width: 130,
  },
  buttonLoader: {
    position: "absolute",
    right: "45%",
  },
  disabledButton: {
    backgroundColor: theme.colors.foreground,
  },
  disabledTitleButton: {
    color: theme.colors.background,
  },
});

export default AddToCartButton;
