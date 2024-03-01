import React from "react";
import { View, Text, StatusBar, StyleSheet, SafeAreaView } from "react-native";
import DeliveryConfirmChangesModal from "../../components/delivery/DeliveryConfirmChangesModal";
import DeliveryMissingProductsModal from "../../components/delivery/DeliveryMissingProductsModal";
import DeliveryTabs from "../../navigators/DeliveryTabs";
import { theme } from "../../styles/theme";

const DeliveryScreen = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.foreground}
      />
      <View style={styles.container}>
        <Text style={[theme.textVariants.title, styles.title]}>
          ¿Cómo te lo entregamos?
        </Text>
      </View>
      <DeliveryConfirmChangesModal />
      <DeliveryMissingProductsModal />
      <DeliveryTabs />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  title: {
    marginVertical: theme.spacing.l,
    marginHorizontal: theme.spacing.m,
  },
});

export default DeliveryScreen;
