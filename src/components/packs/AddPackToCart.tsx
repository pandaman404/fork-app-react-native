import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { theme } from "../../styles/theme";
import { useCartContext } from "../../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import Loader from "../shared/Loader";

const AddPacksToCart = ({ packTypeName, data, preparePackToCart }: any) => {
  const { addProductToCart } = useCartContext();
  const { goBack } = useNavigation<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddPack = async () => {
    const pack = preparePackToCart(packTypeName, data);
    if (pack) {
      setIsLoading(true);
      await addProductToCart(pack);
      goBack();
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <Button
      title={"Agregar"}
      icon={{
        type: "material",
        name: "shopping-bag",
        color: theme.colors.background,
        size: 22,
      }}
      iconPosition="right"
      buttonStyle={styles.button}
      titleStyle={[theme.textVariants.button, styles.buttonTitle]}
      containerStyle={styles.buttonContainer}
      onPress={() => handleAddPack()}
    />
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
  loaderContainer: {
    marginRight: "12%",
  },
});

export default AddPacksToCart;
