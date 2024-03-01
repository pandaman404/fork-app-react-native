import { Discount } from "fork-business-library";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import ProfileDiscountItem from "../../components/profile/ProfileDiscountItem";
import AddItemButton from "../../components/shared/AddItemButton";
import AddPromoCodeModal from "../../components/shared/AddPromoCodeModal";
import CustomAlert from "../../components/shared/CustomAlert";
import InfoAlert from "../../components/shared/InfoAlert";
import Loader from "../../components/shared/Loader";
import { useCartContext } from "../../contexts/CartContext";
import useFetchDiscounts from "../../hooks/useFetchDiscounts";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";

const ProfileDiscountsScreen = () => {
  const { cart, discountAlert } = useCartContext();
  const [visible, setVisible] = useState<boolean>(false);
  const { fetchDiscounts, discounts, loading } = useFetchDiscounts();

  const togglePromoCodeModal = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    fetchDiscounts();
  }, [cart.discounts]);

  return (
    <View
      style={[globalStyles.background, globalStyles.flex1, styles.container]}
    >
      <View style={styles.textContainer}>
        <Text style={[theme.textVariants.bodyVariant2, styles.text]}>
          Ingresa un código de descuento o giftcard
        </Text>
      </View>
      {!discounts || loading ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : (
        discounts.map((discount: Discount, index: number) => (
          <ProfileDiscountItem {...discount} key={index} />
        ))
      )}

      <View style={styles.buttonContainer}>
        <AddItemButton title="Código Promo" openModal={togglePromoCodeModal} />
      </View>

      {discountAlert.code && (
        <CustomAlert
          code={discountAlert.code}
          text={discountAlert.message}
          positionY={"2%"}
        />
      )}
      <AddPromoCodeModal visible={visible} toggleModal={togglePromoCodeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: theme.spacing.m,
  },
  buttonContainer: {
    marginTop: theme.spacing.s,
  },
  textContainer: {
    width: "100%",
  },
  text: {
    color: theme.colors.secondaryVariant,
  },
  loaderContainer: {
    height: "30%",
  },
});

export default ProfileDiscountsScreen;
