import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { theme } from "../styles/theme";
import { globalStyles } from "../styles/global";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Tab = createMaterialTopTabNavigator();

const AuthTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarPressColor: theme.colors.secondaryVariant,
        tabBarIndicatorStyle: [
          globalStyles.tabIndicator,
          { marginLeft: "12%" },
        ],
        tabBarStyle: [globalStyles.tabContainer, { paddingLeft: "12%" }],
      }}
    >
      <Tab.Screen name="Iniciar Sesión" component={LoginScreen} />
      <Tab.Screen name="Regístrate" component={RegisterScreen} />
    </Tab.Navigator>
  );
};

export default AuthTabs;
