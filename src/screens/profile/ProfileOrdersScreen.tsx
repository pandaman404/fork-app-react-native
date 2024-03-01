import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Icon, Overlay } from "react-native-elements";
import ProfileOrderItem from "../../components/profile/ProfileOrderItem";
import { globalStyles } from "../../styles/global";
import { addItemButtonStyles } from "../../styles/buttons";
import { theme } from "../../styles/theme";
import useFetchOrders from "../../hooks/useFetchOrders";

const ProfileOrdersScreen = ({ navigation }: any) => {
  const { fetchOrders, orders, loading } = useFetchOrders();
  const { navigate } = navigation;

  useEffect(() => {
    fetchOrders()
  }, [])



  return <ScrollView style={[globalStyles.background]}>
    {!orders || loading ? (
      <View>
        <View style={styles.orderView}>
          <Text style={theme.textVariants.title}>¡En pedir no hay engaño!</Text>
          <Text style={[theme.textVariants.bodyVariant, styles.textStyle]}>Agrega lo que quieras al canasto para hacer tu primer pedido</Text>
          <Button
            title="Elegir productos"
            containerStyle={addItemButtonStyles.container}
            buttonStyle={addItemButtonStyles.button}
            onPress={() => navigate("HomeScreen", "FeaturedScreen")}
            titleStyle={[theme.textVariants.button, addItemButtonStyles.text]} />
        </View>
      </View>
    ) : (
      <View>
        {orders.map((order: any, index: number) => (
          <ProfileOrderItem
            orderNum={order.id}
            date={order.date}
            status={order.statusName}
            key={index}
            order={order}
          />
        ))}
      </ View>
    )}
  </ScrollView >;
};

const styles = StyleSheet.create({
  orderView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  textStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 10
  },

})

export default ProfileOrdersScreen;
