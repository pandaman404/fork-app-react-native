import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import { Button } from "react-native-elements";

const PackNProductsButton = ({
  thumbnail,
  name,
  subtitle,
  sku,
  id,
  quantity,
  decreaseItemQuantity,
  increaseItemQuantity,
  getSelectedItems,
}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContent}>
        <Image
          source={{
            uri: thumbnail,
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={[theme.textVariants.bodyVariant2]}>{name}</Text>
          <Text style={[theme.textVariants.bodyVariant2]}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          type="clear"
          icon={{
            name: "minus",
            type: "entypo",
            size: 16,
            color: theme.colors.background,
          }}
          iconContainerStyle={styles.button}
          onPress={() => decreaseItemQuantity(id)}
          disabled={quantity === 0 ? true : false}
        />
        <Text style={[theme.textVariants.bodyVariant, styles.value]}>
          {quantity}
        </Text>
        <Button
          type="clear"
          icon={{
            name: "plus",
            type: "entypo",
            size: 16,
            color: theme.colors.background,
          }}
          iconContainerStyle={styles.button}
          onPress={() => increaseItemQuantity(id)}
          disabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondaryVariant2,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  textContainer: {
    marginLeft: theme.spacing.s,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
  },
  button: {
    backgroundColor: theme.colors.secondaryVariant2,
    borderRadius: 50,
    padding: 4,
  },
  value: {
    color: theme.colors.foreground,
  },
});

export default PackNProductsButton;
