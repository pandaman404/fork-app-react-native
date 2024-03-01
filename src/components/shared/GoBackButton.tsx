import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "react-native-elements";
import { theme } from "../../styles/theme";

const GoBackButton = ({ xIcon, black, disabled }: any) => {
  const { goBack } = useNavigation();

  return (
    <Button
      type="clear"
      icon={
        xIcon
          ? {
              name: "x",
              type: "feather",
              size: 25,
              color: theme.colors.background,
            }
          : {
              name: "arrowleft",
              type: "antdesign",
              size: 20,
              color: black ? theme.colors.foreground : theme.colors.background,
            }
      }
      onPress={() => goBack()}
      disabled={disabled}
    />
  );
};

export default GoBackButton;
