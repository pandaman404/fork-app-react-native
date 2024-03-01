import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import { Button } from "react-native-elements";

const PackNProductsButton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContent}>
        <Image
          source={{
            uri: "https://corpora-fork.s3.amazonaws.com/back_img/PTPP01180-gnocchi-huancaina-pt-packaging-frontal-830-1650045149552.jpg",
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={[theme.textVariants.bodyVariant2]}>
            Gnocchi a las 2 salsas
          </Text>
          <Text style={[theme.textVariants.bodyVariant2]}>
            con ricota y grana padano
          </Text>
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
          onPress={() => console.log("- 1")}
          disabled={false}
        />
        <Text style={[theme.textVariants.bodyVariant, styles.value]}>0</Text>
        <Button
          type="clear"
          icon={{
            name: "plus",
            type: "entypo",
            size: 16,
            color: theme.colors.background,
          }}
          iconContainerStyle={styles.button}
          onPress={() => console.log("+ 1")}
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
    marginLeft: theme.spacing.xs,
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
