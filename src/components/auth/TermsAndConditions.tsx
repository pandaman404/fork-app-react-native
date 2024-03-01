import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { theme } from "../../styles/theme";
import { termsAndConditionsURL } from "../../utils/env";

const TermsAndConditions = () => {
  return (
    <Text style={[theme.textVariants.bodyVariant2, styles.text]}>
      Al registrarte en Fork, aceptas los{" "}
      <TouchableWithoutFeedback
        onPress={() => Linking.openURL(termsAndConditionsURL)}
      >
        <Text style={styles.link}>términos y condiciones</Text>
      </TouchableWithoutFeedback>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: theme.colors.secondaryVariant,
    marginVertical: theme.spacing.l,
    maxWidth: 240,
    textAlign: "center",
  },
  link: {
    color: theme.colors.primary,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: theme.colors.primary,
  },
});

export default TermsAndConditions;
