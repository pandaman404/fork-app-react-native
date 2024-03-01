import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { CheckBox, Icon } from "react-native-elements";
import { theme } from "../../styles/theme";

const PackMenuRadioButton = () => {
  return (
    <View style={styles.container}>
      <CheckBox
        title={
          <View style={styles.checkboxTitleContainer}>
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
        }
        checkedIcon={
          <Icon
            name="radio-button-checked"
            type="material"
            color={theme.colors.primary}
            size={24}
            style={styles.checkboxIcon}
          />
        }
        uncheckedIcon={
          <Icon
            name="radio-button-unchecked"
            type="material"
            color={theme.colors.secondaryVariant}
            size={24}
            style={styles.checkboxIcon}
          />
        }
        checkedColor={theme.colors.primary}
        containerStyle={styles.checkboxContainer}
        checked={false}
        onPress={() => console.log("uwu")}
        disabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondaryVariant2,
    paddingLeft: theme.spacing.xs,
  },
  checkboxIcon: {},
  checkboxContainer: {
    backgroundColor: theme.colors.background,
    padding: 0,
    borderWidth: 0,
    margin: 0,
    width: "100%",
  },
  checkboxTitleContainer: {
    flexDirection: "row",
    paddingVertical: theme.spacing.s,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginLeft: theme.spacing.l,
  },
  textContainer: {
    marginLeft: theme.spacing.xs,
  },
});

export default PackMenuRadioButton;
