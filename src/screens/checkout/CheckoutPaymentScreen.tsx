import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DeliveryAddressCheckout from "../../components/checkout/DeliveryAddressCheckout";
import { globalStyles, windowHeight } from "../../styles/global";
import { theme } from "../../styles/theme";
import { formatPrice } from "../../utils/formatText";
import { useCartContext } from "../../contexts/CartContext";
import PesosForkCheckbox from "../../components/checkout/PesosForkCheckbox";
import ConfirmOrderButton from "../../components/checkout/ConfirmOrderButton";
import OrderCompletedModal from "../../components/checkout/OrderCompletedModal";
import WebPaymentWebview from "../../components/checkout/WebPaymentWebview";
import PaymentMethodsSection from "../../components/checkout/PaymentMethodsSection";
import { useCheckoutContext } from "../../contexts/CheckoutContext";
import usePaymentMethods from "../../hooks/usePaymentMethods";
import { useConfigContext } from "../../contexts/ConfigContext";
import CustomAlert from "../../components/shared/CustomAlert";

const CheckoutPaymentScreen = ({ navigation }: any) => {
  const { cart, updateUseWalletInCart } = useCartContext();
  const { config, showCurrentDelivery } = useConfigContext();
  const {
    isLoading,
    toggleCheckoutLoader,
    addPaymentMethodToOrder,
    resetCheckout,
  } = useCheckoutContext();
  const {
    radioButtons,
    togglePaymentRadioButtons,
    pesosFork,
    togglePesosFork,
    showCompletedOrderModal,
    toggleCompletedOrderModal,
    getCurrentDiscount,
    paymentUrl,
    showPaymentModal,
    setShowPaymentModal,
    handleWebPaymentModal,
  } = usePaymentMethods(
    cart,
    updateUseWalletInCart,
    toggleCheckoutLoader,
    addPaymentMethodToOrder
  );
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [customAlertCode, setCustomAlertCode] = useState("");
  const [customAlertMsg, setCustomAlertMsg] = useState("");

  return (
    <>
      <ScrollView style={globalStyles.background}>
        <View style={[styles.subcontainer]}>
          <DeliveryAddressCheckout />
          <View style={styles.subTotalContainer}>
            <View
              style={[globalStyles.flexRowSpaceBetween, styles.subTotalItem]}
            >
              <Text style={theme.textVariants.body}>Sub-total</Text>
              <Text style={theme.textVariants.body}>
                {formatPrice(cart.totalCarro)}
              </Text>
            </View>
            {config.delivery == "DELIVERY" && (
              <View
                style={[globalStyles.flexRowSpaceBetween, styles.subTotalItem]}
              >
                <Text style={theme.textVariants.body}>Delivery</Text>
                <Text style={theme.textVariants.body}>
                  {formatPrice(cart.deliveryPrice - cart.deliveryDiscount)}
                </Text>
              </View>
            )}
            {!cart.discountType.includes("NINGUNO") ? (
              <View
                style={[globalStyles.flexRowSpaceBetween, styles.subTotalItem]}
              >
                <Text style={theme.textVariants.body}>
                  {getCurrentDiscount().name}
                </Text>
                <Text style={theme.textVariants.body}>
                  {getCurrentDiscount().value}
                </Text>
              </View>
            ) : null}

            <View
              style={[globalStyles.flexRowSpaceBetween, styles.subTotalItem]}
            >
              <Text style={theme.textVariants.body}>Total a Pagar</Text>
              <Text style={theme.textVariants.body}>
                {formatPrice(cart.totalResumen)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.paymentMethodsContainer}>
          <View>
            {pesosFork &&
            cart.totalDescuentos === cart.wallet.usedTotal ? null : (
              <PaymentMethodsSection
                radioButtons={radioButtons}
                togglePaymentRadioButtons={togglePaymentRadioButtons}
                pesosForkSelected={pesosFork}
                cart={cart}
              />
            )}
          </View>
          <View
            style={
              pesosFork && cart.totalDescuentos === cart.wallet.usedTotal
                ? { marginTop: 0 }
                : // : { marginTop: theme.spacing.xl }
                Platform.OS === "ios"
                ? windowHeight <= 667
                  ? { marginTop: -20 }
                  : { marginTop: theme.spacing.xl }
                : { marginTop: theme.spacing.xl }
            }
          >
            <Text style={[theme.textVariants.body]}>Otros medios de pago</Text>
            <PesosForkCheckbox
              total={cart.wallet.total}
              checked={pesosFork}
              togglePesosFork={togglePesosFork}
              isLoading={isLoading}
            />
          </View>
        </View>
        <Text style={[theme.textVariants.bodyVariant2, styles.note]}>
          Este es el último paso antes de hacer tu pedido.
        </Text>
      </ScrollView>
      <OrderCompletedModal
        visible={showCompletedOrderModal}
        toggleCompletedOrderModal={toggleCompletedOrderModal}
        showCurrentDelivery={showCurrentDelivery}
        navigation={navigation}
        config={config}
      />
      <WebPaymentWebview
        visible={showPaymentModal}
        toggleCompletedOrderModal={toggleCompletedOrderModal}
        paymentUrl={paymentUrl}
        showPaymentModal={setShowPaymentModal}
        setShowCustomAlert={setShowCustomAlert}
        setCustomAlertCode={setCustomAlertCode}
        setCustomAlertMsg={setCustomAlertMsg}
      />
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.flexCenter,
          globalStyles.windowWidth,
          styles.footer,
        ]}
      >
        <ConfirmOrderButton
          cartTotal={cart.totalResumen}
          isLoading={isLoading}
          toggleCompletedOrderModal={toggleCompletedOrderModal}
          openWebPayment={handleWebPaymentModal}
          navigate={navigation.navigate}
        />
      </View>
      {showCustomAlert && (
        <CustomAlert
          code={customAlertCode}
          text={customAlertMsg}
          positionY={"10%"}
          positionX={"-4%"}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  subcontainer: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.m,
  },
  subTotalContainer: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  subTotalItem: {
    marginBottom: theme.spacing.xs,
  },
  paymentMethodsContainer: {
    backgroundColor: theme.colors.secondary,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.secondaryVariant2,
    paddingTop: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  note: {
    color: theme.colors.secondaryVariant,
    marginTop: theme.spacing.m,
    marginLeft: theme.spacing.m,
    paddingBottom: 95,
  },
  footer: {
    minHeight: 80,
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: theme.colors.secondaryVariant2,
    backgroundColor: theme.colors.background,
    paddingBottom: Platform.OS === "ios" ? theme.spacing.m : 0,
  },
});

export default CheckoutPaymentScreen;
