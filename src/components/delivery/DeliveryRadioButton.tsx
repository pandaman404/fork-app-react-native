import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import { theme } from "../../styles/theme";

const DeliveryRadioButton = ({
  name,
  checked,
  address = null,
  streetAndNumber = null,
  checkRadioButton,
  id,
  from
}: any) => {
  return (
    <View style={styles.container}>
      <View>
        <CheckBox
          title={name}
          checkedIcon={
            <Icon
              name="radio-button-checked"
              type="material"
              color={theme.colors.primary}
              size={28}
            />
          }
          uncheckedIcon={
            <Icon
              name="radio-button-unchecked"
              type="material"
              color={theme.colors.secondaryVariant}
              size={28}
            />
          }
          checkedColor={theme.colors.primary}
          containerStyle={styles.checkboxContainer}
          textStyle={[theme.textVariants.bodyVariant, styles.checkBoxTitle]}
          checked={checked}
          onPress={() => checkRadioButton(id)}
        />
        <View style={styles.checkboxDescContainer}>
          <Text style={[theme.textVariants.bodyVariant2, styles.checkboxDesc]}>
            {address || streetAndNumber}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 0,
    margin: 0,
  },
  checkboxContainer: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    minHeight: 80,
    width: "100%",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondaryVariant2,
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.m,
    margin: 0,
    left: "-2%",
  },
  checkBoxTitle: {
    color: theme.colors.foreground,
    marginLeft: theme.spacing.s,
    fontWeight: "400",
  },
  checkboxDesc: {
    color: theme.colors.secondaryVariant,
  },
  checkboxDescContainer: {
    position: "absolute",
    top: "55%",
    left: "14.5%",
  },
});

export default DeliveryRadioButton;
