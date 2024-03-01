import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DeliveryHeader from "../components/delivery/DeliveryHeader";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import DeliveryScreen from "../screens/delivery/DeliveryScreen";
import AddEditAddressScreen from "../screens/shared/AddEditAddressScreen";
import { DeliveryProvider } from "../contexts/DeliveryContext";
import MapLocationScreen from "../screens/shared/MapLocationScreen";

const Stack = createStackNavigator();

const DeliveryStacks = () => {
  return (
    <DeliveryProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="DeliveryScreen"
          component={DeliveryScreen}
          options={{
            header: () => <DeliveryHeader />,
          }}
        />
        <Stack.Screen
          name="AddEditAddressScreen"
          component={AddEditAddressScreen}
          options={{
            header: ({ navigation }) => (
              <CheckoutHeader title="Editar dirección" />
            ),
          }}
        />
        <Stack.Screen
          name="MapLocationScreen"
          component={MapLocationScreen}
          options={{
            header: ({ navigation }) => (
              <CheckoutHeader title="Editar dirección" />
            ),
          }}
        />
      </Stack.Navigator>
    </DeliveryProvider>
  );
};

export default DeliveryStacks;
