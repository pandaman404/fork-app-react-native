import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { primaryButtonStyles } from "../../styles/buttons";
import { theme } from "../../styles/theme";
import { Button } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Pin from "../../assets/pin-usuario.png";
import useHandleAddressData from "../../hooks/useHandleAddressData";
import Loader from "../../components/shared/Loader";
import { useConfigContext } from "../../contexts/ConfigContext";

const MapLocationScreen = ({ navigation, route, handleCustomAlert }: any) => {
  const { updateAddresses } = useConfigContext();
  const { loading, saveAddress, editAddress } = useHandleAddressData(
    navigation,
    route
  );
  let {
    name,
    streetName,
    number,
    depto,
    communeId,
    communeName,
    latitude,
    longitude,
    addressId,
  } = route.params;
  number = Number(number);
  communeId = Number(communeId);
  const [currentLocation, setCurrentLocation] = useState({
    latitude,
    longitude,
  });

  const handleSaveChanges = async () => {
    await saveAddress(
      name,
      streetName,
      number,
      depto,
      communeId,
      currentLocation.latitude,
      currentLocation.longitude
    );
    await updateAddresses();
    handleCustomAlert(
      'Dirección creada con éxito',
      'ok'
    )
  };

  const handleUpdateAddress = async () => {
    let comment = "comment";
    await editAddress(
      addressId,
      name,
      streetName,
      number,
      depto,
      communeId,
      comment,
      currentLocation.latitude,
      currentLocation.longitude
    );
    await updateAddresses();
    handleCustomAlert(
      'Dirección editada con éxito',
      'ok'
    )
  };

  return (
    <View style={styles.container}>
      <Text style={[theme.textVariants.bodyVariant2, styles.desc]}>
        Ajusta el pin en la dirección exacta
      </Text>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            draggable
            coordinate={currentLocation}
            image={Pin}
            onDragEnd={(direction) =>
              setCurrentLocation(direction.nativeEvent.coordinate)
            }
          />
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : (
          <Button
            title={addressId ? "Editar Dirección " : " Guardar Dirección"}
            onPress={
              addressId
                ? () => handleUpdateAddress()
                : () => handleSaveChanges()
            }
            containerStyle={primaryButtonStyles.container}
            buttonStyle={primaryButtonStyles.button}
            titleStyle={[theme.textVariants.button, primaryButtonStyles.text]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.l,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    flex: 1,
  },
  desc: {
    width: "100%",
    color: theme.colors.secondaryVariant,
  },
  mapContainer: {
    height: "90%",
    width: "100%",
    paddingVertical: theme.spacing.m,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  buttonContainer: {
    maxWidth: "65%",
  },
  loaderContainer: {
    position: "absolute",
  },
});

export default MapLocationScreen;
