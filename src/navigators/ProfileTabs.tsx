import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { theme } from "../styles/theme";
import { globalStyles } from "../styles/global";
import ProfileAddressScreen from "../screens/profile/ProfileAddressScreen";
import ProfileInfoScreen from "../screens/profile/ProfileInfoScreen";
import ProfileOrdersScreen from "../screens/profile/ProfileOrdersScreen";
import ProfileDiscountsScreen from "../screens/profile/ProfileDiscountsScreen";
import ProfileCreditCardScreen from "../screens/profile/ProfileCreditCardScreen";

const Tab = createMaterialTopTabNavigator();

const ProfileTabs = ({
  showCustomAlert,
  customAlertMsg,
  customAlertCode,
  handleCustomAlert,
}: any) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarPressColor: theme.colors.secondaryVariant,
        tabBarLabelStyle: theme.textVariants.tabNavigator,
        tabBarItemStyle: globalStyles.tabItem,
        tabBarIndicatorStyle: globalStyles.tabIndicator,
        tabBarStyle: globalStyles.tabContainer,
      }}
    >
      <Tab.Screen name="Mi Perfil" component={ProfileInfoScreen} />
      <Tab.Screen
        name="Direcciones"
        children={({ navigation }) => (
          <ProfileAddressScreen
            navigation={navigation}
            showCustomAlert={showCustomAlert}
            customAlertMsg={customAlertMsg}
            customAlertCode={customAlertCode}
            handleCustomAlert={handleCustomAlert}
          />
        )}
      />

      <Tab.Screen
        name="Tarjeta de Crédito"
        component={ProfileCreditCardScreen}
      />
      <Tab.Screen name="Pedidos" component={ProfileOrdersScreen} />
      <Tab.Screen name="Alcancía" component={ProfileDiscountsScreen} />
    </Tab.Navigator>
  );
};

export default ProfileTabs;
