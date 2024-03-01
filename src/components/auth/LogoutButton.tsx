import React from "react";
import { Button } from "react-native-elements";
import { useCartContext } from "../../contexts/CartContext";
import { addItemButtonStyles } from "../../styles/buttons";
import { theme } from "../../styles/theme";
import * as Analytics from 'expo-firebase-analytics';

const LogoutButton = ({ closeDrawer, onLogoutSubmit }: any) => {
  const { resetGuestProducts } = useCartContext();
  const logOutUser = async () => {
    resetGuestProducts();
    await onLogoutSubmit();
    closeDrawer();
    await Analytics.logEvent('logout_app');
  };

  return (
    <Button
      title="Cerrar Sesión"
      onPress={() => logOutUser()}
      icon={{ type: "feather", name: "power", size: 20 }}
      containerStyle={addItemButtonStyles.container}
      buttonStyle={addItemButtonStyles.button}
      titleStyle={[theme.textVariants.button, addItemButtonStyles.text]}
    />
  );
};

export default LogoutButton;
