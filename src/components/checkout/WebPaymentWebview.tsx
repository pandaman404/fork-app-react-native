import React, { useState } from "react";
import WebView from "react-native-webview";
import { Overlay, Icon } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
} from "react-native";
import { theme } from "../../styles/theme";
import Loader from "../shared/Loader";
import { windowHeight } from "../../styles/global";
import * as Analytics from 'expo-firebase-analytics';

const WebPaymentWebview = ({
  paymentUrl,
  visible,
  showPaymentModal,
  toggleCompletedOrderModal,
  resetCheckout,
  setShowCustomAlert,
  setCustomAlertCode,
  setCustomAlertMsg
}: any) => {
  const [isLoading, setLoading] = useState(false);
  const iosScreenHeight = Platform.OS === "ios" && windowHeight > 700;

  const cancelPayment = () => {
    showPaymentModal(false); //Cerrar modal de pago
    setShowCustomAlert(true); //Mostrar alerta
    setCustomAlertCode('warning');
    setCustomAlertMsg("No se pudo completar tu compra");
    setTimeout(() => {
      setShowCustomAlert(false);
    }, 3000);
    Analytics.logEvent('purchase_fail_app', {
      server_reason: 'cancel payment'
    });
  };

  const handleNavState = async (newNavState: any) => {
    const { url } = newNavState;
    let link = url.toLowerCase();

    if (!link || link.includes("blank")) {
      cancelPayment();
    }

    if (
      link.includes("success") ||
      link.includes("android") ||
      link.includes("exito")
    ) {
      await resetCheckout();
      showPaymentModal(false);
      toggleCompletedOrderModal();
      Analytics.logEvent('purchase_success_app');
    }

    if (
      link.includes("error") ||
      link.includes("cancel") ||
      link.includes("rechazo")
    ) {
      cancelPayment();
    }
  };

  return (
    <SafeAreaView>
      <Overlay isVisible={visible} overlayStyle={[styles.payment]}>
        <View
          style={[
            styles.closeIconView,
            {
              height: iosScreenHeight ? 100 : 70,
              paddingTop: iosScreenHeight ? 40 : 0,
            },
          ]}
        >
          <Text onPress={() => cancelPayment()} style={[styles.closeIconText]}>
            <Icon
              type="feather"
              name="x"
              size={25}
              color={theme.colors.background}
            />
          </Text>
          <Text
            style={[
              theme.textVariants.title,
              { color: theme.colors.background },
            ]}
          >
            Medio de Pago
          </Text>
        </View>
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={handleNavState}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
          }}
        />
        {isLoading && (
          <View style={styles.loaderView}>
            <Loader />
          </View>
        )}
      </Overlay>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  payment: {
    width: "100%",
    height: "100%",
    padding: 0,
    bottom: -20,
  },
  closeIconView: {
    backgroundColor: "black",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  closeIconText: {
    marginLeft: "3%",
    marginTop: Platform.OS === "ios" ? 10 : 3,
    marginRight: "6%",
  },
  loaderView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WebPaymentWebview;
