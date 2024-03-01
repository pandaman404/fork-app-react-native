import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../styles/theme";
import DeliveryStacks from "./DeliveryStacks";
import AuthHeader from "../components/auth/AuthHeader";
import AuthScreen from "../screens/auth/AuthScreen";
import CheckoutStacks from "./CheckoutStacks";
import FreezerScreen from "../screens/FreezerScreen";
import { CartProvider } from "../contexts/CartContext";
import DrawerNavigator from "./Drawer";
import ProductDetailScreen from "../screens/home/ProductDetailScreen";
import ProductDetailHeader from "../components/productDetail/ProductDetailHeader";
import { useConfigContext } from "../contexts/ConfigContext";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileStacks from "./ProfileStacks";

const Stack = createStackNavigator();

const MainStacks = () => {
  const { user } = useConfigContext();
  return (
    <CartProvider>
      <Stack.Navigator
        screenOptions={{
          title: "",
          headerStyle: {
            shadowColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={user.registered ? DrawerNavigator : HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={{
            header: () => <ProductDetailHeader />,
          }}
        />

        <Stack.Screen
          name="DeliveryStacks"
          component={DeliveryStacks}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{
            header: () => <AuthHeader />,
          }}
        />

        <Stack.Screen
          name="ProfileStacks"
          component={ProfileStacks}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="FreezerScreen"
          component={FreezerScreen}
          options={{
            title: "",
          }}
        />

        <Stack.Screen
          name="CheckoutStacks"
          component={CheckoutStacks}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </CartProvider>
  );
};

export default MainStacks;
