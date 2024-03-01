import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectAddressScreen from "../screens/delivery/SelectAddressScreen";
import SelectStoreScreen from "../screens/delivery/SelectStoreScreen";
import { theme } from "../styles/theme";
import { globalStyles } from "../styles/global";
import { useDeliveryContext } from "../contexts/DeliveryContext";
import { View } from "react-native";
import Loader from "../components/shared/Loader";

const Tab = createMaterialTopTabNavigator();

const DeliveryTabs = () => {
  const { showRadioButtons, hideLoader } = useDeliveryContext();

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      {!showRadioButtons ? (
        <View style={globalStyles.overlay}>
          <Loader />
        </View>
      ) : null}

      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarPressColor: theme.colors.secondaryVariant,
          tabBarLabelStyle: theme.textVariants.tabNavigator,
          tabBarItemStyle: [globalStyles.tabItem, { marginLeft: "10%" }],
          tabBarIndicatorStyle: [globalStyles.tabIndicator],
          tabBarStyle: [globalStyles.tabContainer],
        }}
      >
        <Tab.Screen name="Fork lo lleva" component={SelectAddressScreen} />
        <Tab.Screen name="Retiro en tienda" component={SelectStoreScreen} />
      </Tab.Navigator>
    </>
  );
};

export default DeliveryTabs;
