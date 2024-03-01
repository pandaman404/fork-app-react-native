import { StackActions } from "@react-navigation/native";
import React, { useState } from "react";
import { addAddress, getCommunes, getGeoAddress, updateAddress } from "../api/user";
import { Keyboard } from "react-native";
import * as Analytics from 'expo-firebase-analytics';

const useHandleAddressData = (navigation: any, route: any) => {
  const { navigate, dispatch } = navigation;
  const [communes, setCommunes] = useState<any>(null);
  const popAction = StackActions.pop(2);
  const [loading, setLoading] = useState(false);

  const getCommunesData = async () => {
    const response = await getCommunes();
    if (response.length > 0) {
      setCommunes(response);
    }
  };

  const onContinue = async (data: any) => {
    Keyboard.dismiss();
    setLoading(true);
    let { name, streetName, number, depto, comunne } = data;
    let communeId = Number(comunne.split("_")[0]);
    let communeName = comunne.split("_")[1];
    let { latitude, longitude } = await getGeoAddress(
      streetName,
      number,
      communeName
    );
    let addressId = route.params ? route.params.addressId : false;

    navigate("MapLocationScreen", {
      name,
      streetName,
      number,
      depto,
      communeId,
      communeName,
      latitude,
      longitude,
      addressId
    });
    setLoading(false);
  };

  const saveAddress = async (
    name: string,
    streetName: string,
    number: number,
    depto: string,
    communeId: number,
    latitude: number,
    longitude: number,
    comment: string = ""
  ) => {
    setLoading(true);
    await addAddress(
      name,
      streetName,
      number,
      depto,
      communeId,
      comment,
      latitude,
      longitude
    );
    Analytics.logEvent('create_address_app', {
      address_name: name,
      address_id: communeId
    });

    setTimeout(() => {
      dispatch(popAction);
      setLoading(false);
    }, 500);
  };

  const editAddress = async (
    id: number,
    name: string,
    streetName: string,
    number: number,
    depto: string = "",
    communeId: number,
    comment: string = "",
    latitude: number,
    longitude: number,
  ) => {
    setLoading(true);
    await updateAddress(
      id,
      name,
      streetName,
      number,
      depto,
      communeId,
      comment,
      latitude,
      longitude
    );
    Analytics.logEvent('edit_address_app', {
      address_name: name,
      address_id: communeId
    });
    setTimeout(() => {
      dispatch(popAction);
      setLoading(false);
    }, 500);
  };

  return {
    communes,
    getCommunesData,
    onContinue,
    saveAddress,
    editAddress,
    loading,
  };
};

export default useHandleAddressData;
