import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import DeliveryStacks from "./DeliveryStacks";
import CartScreen from "../screens/checkout/CartScreen";
import CheckoutDeliveryScreen from "../screens/checkout/CheckoutDeliveryScreen";
import CheckoutDiscountsScreen from "../screens/checkout/CheckoutDiscountsScreen";
import CheckoutPaymentScreen from "../screens/checkout/CheckoutPaymentScreen";
import { CheckoutProvider } from "../contexts/CheckoutContext";
import { Alert } from "react-native";

const Stack = createStackNavigator();

const CheckoutStacks = ({ navigation }: any) => {
  // const [keyNum, setKeyNum] = useState(Math.floor(Math.random() * 100))
  // useEffect(() => {
  //   const focusHandler = navigation.addListener('focus', () => {
  //     setKeyNum(Math.floor(Math.random() * 100))
  //     Alert.alert('Refreshed');
  //     console.log('keyNum', keyNum)
  //   });
  //   return focusHandler;
  // }, [navigation]);

  return (
    <CheckoutProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            header: () => <CheckoutHeader title="Tu Canasto" xIcon />,
          }}
        />
        <Stack.Screen
          name="CheckoutDeliveryScreen"
          component={CheckoutDeliveryScreen}
          options={{
            header: () => <CheckoutHeader title="Entrega" />,
          }}
        />
        <Stack.Screen
          name="CheckoutDiscountsScreen"
          component={CheckoutDiscountsScreen}
          options={{
            header: () => <CheckoutHeader title="Descuentos" />,
          }}
        />
        <Stack.Screen
          name="CheckoutPaymentScreen"
          children={({ navigation }) => (<CheckoutPaymentScreen navigation={navigation} />)}
          options={{
            title: "Confirmar",
            header: () => <CheckoutHeader title="Confirmar" />,
          }}
        />
      </Stack.Navigator>
    </CheckoutProvider>
  );
};

export default CheckoutStacks;
