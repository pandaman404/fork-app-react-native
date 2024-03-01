import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import { useCartContext } from "../../contexts/CartContext";
import QuestionModal from "../shared/QuestionModal";

const ItemQuantityButton = ({
  sku,
  quantity,
  canAddMore,
  name,
  packProducts = null,
}: any) => {
  const { addProductToCart, removeProductFromCart, isBusy } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [visible, setVisible] = useState(false);

  const product = {
    sku,
    quantity,
    pack:
      packProducts && packProducts.length > 0
        ? packProducts.map((product: any) => ({
          sku: product.sku,
          quantity: product.quantity,
        }))
        : null,
  };

  const handleRemoveItem = () => {
    if (quantity == 1) {
      setVisible(true)
    } else {
      removeItem()
    }
  }

  const removeItem = async () => {
    setVisible(false)
    setIsLoading(true);
    await removeProductFromCart(product);
    setIsLoading(false);
  }

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button
        type="clear"
        icon={{
          name: "minus",
          type: "entypo",
          size: 16,
          color: theme.colors.background,
        }}
        iconContainerStyle={styles.buttonContainer}
        onPress={() => handleRemoveItem()}
        disabled={isBusy}
      />
      {isLoading ? (
        <ActivityIndicator size={16} color={theme.colors.primary} />
      ) : (
        <Text style={[theme.textVariants.body, styles.text]}>{quantity}</Text>
      )}
      <Button
        type="clear"
        icon={{
          name: "plus",
          type: "entypo",
          size: 16,
          color: theme.colors.background,
        }}
        iconContainerStyle={[
          styles.buttonContainer,
          !canAddMore
            ? { backgroundColor: theme.colors.secondaryVariant2 }
            : { backgroundColor: theme.colors.secondaryVariant },
        ]}
        onPress={async () => {
          setIsLoading(true);
          await addProductToCart(product);
          setIsLoading(false);
        }}
        disabled={!canAddMore || isBusy}
      />
      <QuestionModal
        visible={visible}
        title={`¿Quitar ${name} del canasto?`}
        cancelButton={'No'}
        acceptButton={"Sí, quitar"}
        handleCancelButton={() => setVisible(false)}
        handleAcceptButton={removeItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: theme.colors.foreground,
    minWidth: 130,
    borderRadius: 30,
  },
  buttonContainer: {
    backgroundColor: theme.colors.secondaryVariant,
    borderRadius: 50,
    padding: 4,
  },
  text: {
    color: theme.colors.background,
  }
});

export default ItemQuantityButton;
