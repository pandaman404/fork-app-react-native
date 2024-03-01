import React from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import ProfileItemAddress from "../../components/profile/ProfileItemAddress";
import CustomAlert from "../../components/shared/CustomAlert";
import NavButton from "../../components/shared/NavButton";
import { useConfigContext } from "../../contexts/ConfigContext";
import useHandleAddress from "../../hooks/useHandleAddress";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";

const ProfileAddressScreen = ({
  navigation: { navigate },
  showCustomAlert,
  customAlertMsg,
  customAlertCode,
  handleCustomAlert
}: any) => {
  const { addresses, handleDeleteAddress } = useConfigContext();
  const {
    enabledAddresses,
    disabledAddresses,
    showAddressOptions,
    openEditAddress,
  } = useHandleAddress(addresses);

  return (
    <Pressable onPress={() => showAddressOptions(null)}>
      <ScrollView
        contentContainerStyle={[
          globalStyles.background,
          globalStyles.minHeight,
          styles.container,
        ]}>
        <View style={styles.textContainer}>
          <Text style={[theme.textVariants.bodyVariant2, styles.text]}>
            Ingresa una dirección donde quieras recibir Fork
          </Text>
        </View>
        <View style={globalStyles.windowWidth}>
          {enabledAddresses.map(
            ({ name, streetAndNumber, id, showOptions }: any) => (
              <ProfileItemAddress
                key={id}
                name={name}
                streetAndNumber={streetAndNumber}
                id={id}
                showOptions={showOptions}
                showAddressOptions={showAddressOptions}
                disabled={false}
                deleteAddress={handleDeleteAddress}
                openEditAddress={openEditAddress}
                handleCustomAlert={handleCustomAlert}
              />
            ))}
        </View>
        <View style={styles.navButtonContainer}>
          <NavButton
            title="Nueva Dirección"
            icon={{
              name: "plus",
              type: "entypo",
              size: 22,
              color: theme.colors.foreground,
            }}
            navigate={navigate}
            screenName={"AddEditAddressScreen"}
            nestedNavigator={"ProfileStacks"}
            addItemButton
          />
        </View>
        {disabledAddresses.length > 0 && (
          <View style={globalStyles.windowWidth}>
            <Text style={[theme.textVariants.body, styles.title]}>
              Direcciones sin delivery temporalmente
            </Text>
            {disabledAddresses.map(
              ({ name, streetAndNumber, id, showOptions }: any) => (
                <ProfileItemAddress
                  key={id}
                  name={name}
                  streetAndNumber={streetAndNumber}
                  id={id}
                  showOptions={showOptions}
                  showAddressOptions={showAddressOptions}
                  disabled={true}
                  deleteAddress={handleDeleteAddress}
                  openEditAddress={openEditAddress}
                  handleCustomAlert={handleCustomAlert}
                />
              ))}
            <Text style={styles.textNoDelivery}>
              Estamos trabajando para llegar cada vez más lejos. Estas direcciones
              todavía esán fuera de nuestra área de delivery
            </Text>
          </View>
        )}
      </ScrollView>
      {showCustomAlert && <CustomAlert
        text={customAlertMsg}
        code={customAlertCode}
        positionY={"2%"}
        positionX={'-4%'} />}
    </Pressable >
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: theme.spacing.s,
  },
  navButtonContainer: {
    marginTop: theme.spacing.s,
  },
  textContainer: {
    width: "100%",
    paddingHorizontal: theme.spacing.m,
  },
  text: {
    color: theme.colors.secondaryVariant,
  },
  title: {
    marginVertical: theme.spacing.xs,
    fontSize: 18,
    paddingHorizontal: theme.spacing.m,
  },
  textNoDelivery: {
    color: theme.colors.secondaryVariant,
    paddingVertical: theme.spacing.s,
    marginHorizontal: theme.spacing.m,
  },
});

export default ProfileAddressScreen;
