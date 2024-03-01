import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import ContinueButton from "../../components/checkout/ContinueButton";
import DeliveryAddressCheckout from "../../components/checkout/DeliveryAddressCheckout";
import DiscountRadioButton from "../../components/checkout/DiscountRadioButton";
import AddItemButton from "../../components/shared/AddItemButton";
import AddPromoCodeModal from "../../components/shared/AddPromoCodeModal";
import { useCartContext } from "../../contexts/CartContext";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";
import { updateRadioButtonsState } from "../../utils/handleRadioButtons";
import { formatPrice } from "../../utils/formatText";
import { useConfigContext } from "../../contexts/ConfigContext";
import CustomAlert from "../../components/shared/CustomAlert";

const CheckoutDiscountsScreen = ({ navigation }: any) => {
  const { cart, discountAlert, updateDiscountInCart } = useCartContext();
  const [visible, setVisible] = useState(false);
  const [radioButtons, setRadioButtons] = useState<any[]>([]);
  const { config } = useConfigContext();

  const renderRadioButtons = () => {
    const newRadioButtons = cart.discounts.map((discount, id) => {
      if (discount.type === cart.discountType) {
        return { ...discount, id, checked: true };
      }
      return { ...discount, id, checked: false };
    });

    setRadioButtons(newRadioButtons);
  };

  const toggleRadioButtons = async (id: number) => {
    const radioButtonsData = updateRadioButtonsState(radioButtons, id);
    const checkedDiscount = radioButtonsData.find(
      (item) => item.checked === true
    );
    setRadioButtons(radioButtonsData);
    try {
      await updateDiscountInCart(checkedDiscount.type);
    } catch (error) {
      console.log(error);
    }
  };

  const togglePromoCodeModal = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    renderRadioButtons();
  }, [cart.discountType]);

  return (
    <View style={[globalStyles.flex1, globalStyles.background]}>
      <View style={styles.subcontainer}>
        <DeliveryAddressCheckout />
        <View style={styles.subTotalContainer}>
          <View style={[globalStyles.flexRowSpaceBetween, styles.subTotalItem]}>
            <Text style={theme.textVariants.body}>Sub-total</Text>
            <Text style={theme.textVariants.body}>
              {formatPrice(cart.totalCarro)}
            </Text>
          </View>
        </View>
        {config.delivery == "DELIVERY" && (
          <View style={styles.deliveryContainer}>
            <View
              style={[globalStyles.flexRowSpaceBetween, styles.subTotalItem]}
            >
              <Text style={theme.textVariants.body}>Delivery</Text>
              <Text style={theme.textVariants.body}>
                {formatPrice(cart.deliveryPrice - cart.deliveryDiscount)}
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={[globalStyles.windowWidth, styles.discountsContainer]}>
        <Text style={[theme.textVariants.body, styles.discountsTitle]}>
          Descuentos
        </Text>

        {cart.discounts.length > 1
          ? radioButtons.map((radioButton, index) => {
            return (
              <DiscountRadioButton
                {...radioButton}
                toggleRadioButtons={toggleRadioButtons}
                key={index}
              />
            );
          })
          : null}
        <Text style={[theme.textVariants.bodyVariant2, styles.description]}>
          Selecciona un código para obtener descuentos en tu compra
        </Text>
        <View style={styles.promoContainer}>
          <AddItemButton
            title="Código Promo"
            openModal={togglePromoCodeModal}
          />
        </View>
        <AddPromoCodeModal
          visible={visible}
          toggleModal={togglePromoCodeModal}
        />
      </View>
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.flexCenter,
          globalStyles.windowWidth,
          styles.footer,
        ]}
      >
        {discountAlert.code && (
          <CustomAlert
            code={discountAlert.code}
            text={discountAlert.message}
            positionY={"102%"}
            positionX={"-4%"}
          />
        )}
        <ContinueButton
          discountData
          title={cart.totalResumen}
          navigate={navigation.navigate}
          nextScreen={"CheckoutPaymentScreen"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  discountsTitle: {
    marginBottom: theme.spacing.m,
  },
  subcontainer: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.m,
  },
  description: {
    color: theme.colors.secondaryVariant,
    marginTop: theme.spacing.l,
  },
  subTotalContainer: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  deliveryContainer: {
    marginTop: -5,
    marginBottom: theme.spacing.s,
  },
  subTotalItem: {
    marginBottom: theme.spacing.xs,
  },
  discountsContainer: {
    backgroundColor: theme.colors.secondary,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.secondaryVariant2,
    padding: theme.spacing.m,
  },
  promoContainer: {
    top: Platform.OS === 'ios' ? "0%" : "5%",
    left: "22%",
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

export default CheckoutDiscountsScreen;
