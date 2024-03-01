import React from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import { theme } from "../../styles/theme";

const DeliveryDisabledButton = ({
  name,
  address = null,
  streetAndNumber = null,
}: any) => {

  return (
    <View style={[styles.container]}>
      <View style={styles.checkboxContainer}>
        <View>
          <Text style={[theme.textVariants.bodyVariant, styles.checkBoxTitle]}>
            {name}
          </Text>
        </View>
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
    backgroundColor: theme.colors.secondary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondaryVariant2,
    position: "relative",
  },
  checkboxContainer: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    minHeight: 80,
    width: "87%",
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.m,
    margin: 0,
    marginLeft: -20,
  },
  checkBoxTitle: {
    marginLeft: -10,
    color: theme.colors.foreground,
    fontWeight: "800",
  },
  checkboxDesc: {
    color: theme.colors.secondaryVariant,
  },
  checkboxDescContainer: {
    position: "absolute",
    top: "65%",
    left: "3%",
  }
});

export default DeliveryDisabledButton;
