import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import { CheckBox, Icon } from "react-native-elements";
import { formatPrice } from "../../utils/formatText";

const PesosForkCheckbox = ({
  total,
  checked,
  togglePesosFork,
  isLoading,
}: any) => {
  return (
    <View>
      <CheckBox
        title={
          <View style={styles.checkboxTextContainer}>
            <View style={styles.paymentCol1}>
              <Text style={[theme.textVariants.body, styles.paymentName]}>
                Pesos Fork
              </Text>
              <Text
                style={[
                  theme.textVariants.bodyVariant2,
                  styles.paymentDescription,
                ]}
              >
                Tienes {formatPrice(total)} disponible
              </Text>
            </View>
          </View>
        }
        checkedIcon={
          isLoading ? (
            <ActivityIndicator
              color={theme.colors.primary}
              size={22}
              style={styles.loader}
            />
          ) : (
            <Icon
              name="checksquare"
              type="antdesign"
              color={theme.colors.primary}
              size={22}
              style={styles.checkboxIcon}
            />
          )
        }
        uncheckedIcon={
          isLoading ? (
            <ActivityIndicator
              color={theme.colors.primary}
              size={22}
              style={styles.loader}
            />
          ) : (
            <Icon
              name="square"
              type="feather"
              color={theme.colors.secondaryVariant}
              size={22}
              style={styles.checkboxIcon}
            />
          )
        }
        checkedColor={theme.colors.primary}
        containerStyle={styles.checkboxContainer}
        checked={checked}
        onPress={() => togglePesosFork()}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxIcon: {
    marginBottom: "120%",
  },
  loader: {
    marginBottom: "6%",
  },
  checkboxContainer: {
    backgroundColor: theme.colors.secondary,
    padding: 0,
    borderWidth: 0,
    marginBottom: theme.spacing.l,
  },
  checkboxTextContainer: {
    width: "90%",
    marginLeft: theme.spacing.s,
    flexDirection: "row",
    justifyContent: "space-between",
    top: 5,
  },
  paymentCol1: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",
  },
  paymentCol2: {},
  paymentName: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.foregroundVariant,
  },
  paymentDescription: {
    color: theme.colors.secondaryVariant,
    marginBottom: theme.spacing.m,
  },
});

export default PesosForkCheckbox;
