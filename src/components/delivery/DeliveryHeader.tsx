import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import { Button } from "react-native-elements";
import { globalStyles } from "../../styles/global";
import GoBackButton from "../shared/GoBackButton";
import { useNavigation } from "@react-navigation/native";
import { useDeliveryContext } from "../../contexts/DeliveryContext";

const DeliveryHeader = () => {
  const { handlePressContinue } = useDeliveryContext();
  const { goBack } = useNavigation<any>();

  return (
    <View style={[globalStyles.flexRowSpaceBetween, styles.header]}>
      <GoBackButton />
      <Text style={[theme.textVariants.title, styles.headerText]}>
        Personaliza tu pedido
      </Text>
      <Button
        type="clear"
        title="aceptar"
        onPress={() => {
          handlePressContinue(goBack);
        }}
        titleStyle={[theme.textVariants.button, styles.acceptButton]}
        buttonStyle={styles.acceptButtonContainer}
        containerStyle={styles.acceptButtonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === "ios" ? 90 : 70,
    width: "100%",
    backgroundColor: theme.colors.foreground,
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.m,
    paddingTop: Platform.OS === "ios" ? 30 : 0,
  },
  headerText: {
    color: theme.colors.background,
  },
  acceptButton: {
    color: theme.colors.background,
    textTransform: "uppercase",
  },
  acceptButtonContainer: {
    marginTop: 2,
    padding: 0,
  },
});

export default DeliveryHeader;
