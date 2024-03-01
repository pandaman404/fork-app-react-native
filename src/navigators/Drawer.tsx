import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/home/HomeScreen";
import CustomDrawer from "../components/home/CustomDrawer";
import { theme } from "../styles/theme";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  return (
    <Drawer.Navigator
      backBehavior="initialRoute"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveTintColor: theme.colors.foreground,
        drawerInactiveTintColor: theme.colors.foreground,
        drawerActiveBackgroundColor: 'transparent',
        drawerLabelStyle: theme.textVariants.body,
        drawerStyle: {
          backgroundColor: theme.colors.background
        }
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerItemStyle: {
            display: "none",
          },
        }} />
    </Drawer.Navigator >
  )
};

export default DrawerNavigator;
