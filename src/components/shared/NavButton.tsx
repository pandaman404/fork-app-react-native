import React from "react";
import { Button } from "react-native-elements";
import {
  primaryButtonStyles,
  deliveryHomeButtonStyles,
  iconButtonStyles,
  addItemButtonStyles,
} from "../../styles/buttons";
import { theme } from "../../styles/theme";

const NavButton = ({
  title,
  icon,
  navigate,
  nestedNavigator,
  screenName,
  deliveryHomeButton,
  iconButton,
  addItemButton,
  openDrawer,
  drawer,
}: any) => {
  if (deliveryHomeButton) {
    return (
      <Button
        title={title}
        icon={icon}
        type="solid"
        iconPosition="right"
        containerStyle={deliveryHomeButtonStyles.container}
        buttonStyle={deliveryHomeButtonStyles.button}
        titleStyle={[theme.textVariants.button, deliveryHomeButtonStyles.text]}
        onPress={
          nestedNavigator
            ? () => navigate(nestedNavigator, { screen: screenName })
            : () => navigate(screenName)
        }
      />
    );
  }

  if (iconButton) {
    return (
      <Button
        icon={icon}
        type="clear"
        buttonStyle={iconButtonStyles.container}
        onPress={
          nestedNavigator
            ? () => navigate(nestedNavigator, { screen: screenName })
            : () => navigate(screenName)
        }
      />
    );
  }

  if (addItemButton) {
    return (
      <Button
        type="outline"
        title={title}
        icon={icon}
        containerStyle={addItemButtonStyles.container}
        buttonStyle={addItemButtonStyles.button}
        titleStyle={[theme.textVariants.button, addItemButtonStyles.text]}
        onPress={
          nestedNavigator
            ? () => navigate(nestedNavigator, { screen: screenName })
            : () => navigate(screenName)
        }
      />
    );
  }

  if (drawer) {
    return (
      <Button
        icon={icon}
        type="clear"
        buttonStyle={iconButtonStyles.container}
        onPress={() => openDrawer(drawer)}
      />
    );
  }

  return (
    <Button
      title={title}
      onPress={
        nestedNavigator
          ? () => navigate(nestedNavigator, { screen: screenName })
          : () => navigate(screenName)
      }
      containerStyle={primaryButtonStyles.container}
      buttonStyle={primaryButtonStyles.button}
      titleStyle={[theme.textVariants.button, primaryButtonStyles.text]}
    />
  );
};

export default NavButton;
