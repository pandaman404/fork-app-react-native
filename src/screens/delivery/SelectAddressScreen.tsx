import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DeliveryDisabledButton from "../../components/delivery/DeliveryDisabledButton";
import DeliveryRadioButton from "../../components/delivery/DeliveryRadioButton";
import NavButton from "../../components/shared/NavButton";
import { useConfigContext } from "../../contexts/ConfigContext";
import { useDeliveryContext } from "../../contexts/DeliveryContext";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";

const SelectAddressScreen = ({ navigation: { navigate } }: any) => {
  const { user } = useConfigContext();
  const { radioButtons, checkRadioButton, splitRadioButtons } = useDeliveryContext();
  const { addressRadioButtons } = splitRadioButtons(radioButtons);

  const { enabledAddresses, disabledAddresses } = addressRadioButtons.reduce(
    (acc: any, curr: any) => {
      if (curr.isDeliveryAvailable) {
        acc.enabledAddresses = [...acc.enabledAddresses, curr];
      } else {
        acc.disabledAddresses = [...acc.disabledAddresses, curr];
      }
      return acc;
    },
    { enabledAddresses: [] as any[], disabledAddresses: [] as any[] }
  );

  return (
    <ScrollView
      contentContainerStyle={[
        globalStyles.background,
        globalStyles.flexColumn,
        globalStyles.flexStartCenter,
        globalStyles.minHeight,
      ]}
    >
      {enabledAddresses.map((item: any) => {
        return (<DeliveryRadioButton
          {...item}
          checkRadioButton={checkRadioButton}
          key={item.id}
        />
        );
      })}
      <NavButton
        title="Nueva dirección"
        navigate={navigate}
        screenName={!user.registered ? "AuthScreen" : "AddEditAddressScreen"}
        nestedNavigator={!user.registered ? null : "DeliveryStacks"}
        icon={{
          name: "plus",
          type: "entypo",
          size: 22,
          color: theme.colors.foreground,
        }}
        addItemButton
      />
      {disabledAddresses.length > 0 && <View style={{ width: '100%', marginVertical: 10 }}>
        <Text style={[theme.textVariants.body, styles.title]}>
          Direcciones sin delivery temporalmente</Text>
        {disabledAddresses.map((item: any) => {
          return (
            !item.isDeliveryAvailable && <DeliveryDisabledButton
              {...item}
              key={item.id}
            />
          );
        })}
        <Text style={styles.text}>
          Estamos trabajando para llegar cada vez más lejos. Estas direcciones todavía esán fuera de nuestra área de delivery
        </Text>
      </View>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: theme.spacing.xs,
    fontSize: 18,
    paddingHorizontal: theme.spacing.m
  },
  text: {
    color: theme.colors.secondaryVariant,
    paddingVertical: theme.spacing.s,
    marginHorizontal: theme.spacing.m
  }
});

export default SelectAddressScreen;
