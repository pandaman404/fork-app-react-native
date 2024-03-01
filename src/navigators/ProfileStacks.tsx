import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import AddEditAddressScreen from "../screens/shared/AddEditAddressScreen";
import MapLocationScreen from "../screens/shared/MapLocationScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import ProfileHeader from "../components/profile/ProfileHeader";
import useHandleAddress from "../hooks/useHandleAddress";
import { useConfigContext } from "../contexts/ConfigContext";

const Stack = createStackNavigator();

const ProfileStacks = () => {
  const { addresses } = useConfigContext();
  const {
    showCustomAlert,
    customAlertMsg,
    customAlertCode,
    handleCustomAlert } = useHandleAddress(addresses)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        children={({}) => <ProfileScreen
          showCustomAlert={showCustomAlert}
          customAlertMsg={customAlertMsg}
          customAlertCode={customAlertCode}
          handleCustomAlert={handleCustomAlert} />}
        options={{
          header: ({ navigation }) => <ProfileHeader />,
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
        children={({ navigation, route }) =>
          <MapLocationScreen
            navigation={navigation}
            route={route}
            handleCustomAlert={handleCustomAlert} />}
        options={{
          header: ({ navigation }) => (
            <CheckoutHeader title="Editar dirección" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStacks;
