import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { windowHeight, windowWidth } from "../../styles/global";
import { theme } from "../../styles/theme";
import * as Analytics from "expo-firebase-analytics";

const ProfileOrdersItem = ({ orderNum, date, status, order }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const OVERGROWTH = "#87D439";
  const ABYSSOPELAGIC = "#00000033";

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };

  const handleOrderDetail = () => {
    setIsVisible(!isVisible);
    Analytics.logEvent("product_detail_app", {
      order_id: orderNum,
    });
  };

  const statusLabel = (status: any) => {
    return (
      <Text
        style={[
          styles.statusText,
          {
            backgroundColor: status == "Ingresada" ? OVERGROWTH : ABYSSOPELAGIC,
          },
        ]}
      >
        {status}
      </Text>
    );
  };

  const withdrawalOrDelivery = () => {
    const address = order.addressName !== "none" ? order.addressName : "";
    if (order.orderKind === 0) {
      return "Retiro en tienda " + order.storeName;
    } else {
      return "Despacho a " + address;
    }
  };

  return (
    <SafeAreaView style={styles.orderItemView}>
      <TouchableOpacity style={styles.orderItem} onPress={handleOrderDetail}>
        <View
          style={{
            flex: 7,
            justifyContent: "center",
            paddingLeft: Platform.OS === "ios" ? 10 : 0,
            height:
              Platform.OS === "ios" ? (windowHeight <= 667 ? 90 : 100) : 45,
          }}
        >
          <Text style={[theme.textVariants.title, { fontSize: 25 }]}>
            Pedido N°{orderNum}
          </Text>
          <Text style={styles.orderDate}>{date}</Text>
        </View>
        <View style={styles.status}>{statusLabel(status)}</View>
      </TouchableOpacity>
      <Overlay
        isVisible={isVisible}
        fullScreen
        overlayStyle={styles.overlayStyle}
      >
        <View style={[styles.overlayHeader, { width: windowWidth }]}>
          <Text
            onPress={toggleOverlay}
            style={[styles.closeIconText, theme.textVariants.title]}
          >
            <Icon
              type="antdesign"
              name="arrowleft"
              size={25}
              color={theme.colors.background}
              style={{ marginRight: 20, marginBottom: -5 }}
            />
            <Text>Pedido N°{orderNum}</Text>
          </Text>
        </View>
        <View style={styles.detailsHeader}>
          <View style={styles.detailsHeaderTop}>
            {statusLabel(status)}
            <Text style={{ color: theme.colors.secondaryVariant }}>
              {order.date}
            </Text>
          </View>
          <View style={{ width: "100%", height: "35%" }}>
            <Text style={theme.textVariants.body}>
              {withdrawalOrDelivery()}
            </Text>
          </View>
        </View>
        <View style={styles.detailsBody}>
          <Text style={{ width: "75%" }}>{order.description}</Text>
          <Text style={styles.orderTotal}>${order.total}</Text>
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  orderItemView: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
    height: "100%",
  },
  orderItem: {
    flex: 1,
    flexDirection: "row",
  },
  status: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    color: theme.colors.background,
    paddingLeft: 5,
    paddingRight: 4,
    paddingVertical: 2,
    borderRadius: 5,
    overflow: "hidden",
    textTransform: "uppercase",
  },
  orderDate: {
    color: theme.colors.secondaryVariant,
    paddingTop: 5,
  },
  closeIconText: {
    marginLeft: "3%",
    marginTop: Platform.OS === "ios" ? 10 : 3,
    color: theme.colors.background,
    flexDirection: "row",
  },
  overlayStyle: {
    padding: 0,
    marginTop: Platform.OS === "ios" ? (windowHeight <= 667 ? 40 : "18%") : 0,
  },
  overlayHeader: {
    backgroundColor: theme.colors.foreground,
    height: 60,
    paddingTop: Platform.OS === "ios" ? 7 : 13,
  },
  detailsHeader: {
    height: 85,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
    justifyContent: "flex-start",
  },
  detailsHeaderTop: {
    flexDirection: "row",
    width: "100%",
    height: "65%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsBody: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  orderTotal: {
    width: "25%",
    textAlign: "right",
    textAlignVertical: "center",
  },
});

export default ProfileOrdersItem;
