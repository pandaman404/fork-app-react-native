import React, { useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useConfigContext } from "../../contexts/ConfigContext";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";
import NavButton from "../shared/NavButton";

const Header = ({ navigate, openDrawer }: any) => {
  const { showCurrentDelivery, config, user } = useConfigContext();
  let delivery = useMemo(() => showCurrentDelivery(), [config]);

  return (
    <View style={[globalStyles.flexRowSpaceBetween, styles.header]}>
      <NavButton
        title={
          !delivery ? (
            <ActivityIndicator
              size="small"
              color={theme.colors.secondaryVariant}
            />
          ) : (
            delivery.text
          )
        }
        navigate={navigate}
        screenName={"DeliveryScreen"}
        nestedNavigator={"DeliveryStacks"}
        icon={{
          type: "font-awesome",
          name: "angle-right",
          size: 22,
          color: theme.colors.secondaryVariant,
        }}
        deliveryHomeButton
      />

      {user.registered ? (
        <NavButton
          icon={{ type: "evilicon", name: "user", size: 38 }}
          openDrawer={openDrawer}
          drawer={"DrawerNavigator"}
        />
      ) : (
        <NavButton
          icon={{ type: "evilicon", name: "user", size: 38 }}
          navigate={navigate}
          screenName={"AuthScreen"}
          iconButton
        />
      )}
      {/* <NavButton
        icon={{ type: "antdesign", name: "qrcode", size: 30 }}
        navigate={navigate}
        screenName="FreezerScreen"
        iconButton
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.background,
    zIndex: 100,
    elevation: 100,
  },
});

export default Header;
