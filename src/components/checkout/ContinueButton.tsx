import React, { useState } from "react";
import { Button } from "react-native-elements";
import { useCartContext } from "../../contexts/CartContext";
import { useCheckoutContext } from "../../contexts/CheckoutContext";
import { primaryButtonStyles } from "../../styles/buttons";
import { theme } from "../../styles/theme";
import { formatPrice } from "../../utils/formatText";
import Loader from "../shared/Loader";

const ContinueButton = ({
  startNewOrder,
  deliveryData,
  discountData,
  title,
  handleSubmit,
  data,
  navigate,
  nextScreen,
}: any) => {
  const { addItemsToOrder, addDeliveryDataToOrder, addDiscountTypeToOrder } =
    useCheckoutContext();
  const { updateDeliverySchedule } = useCartContext();
  const [loading, setLoading] = useState(false)

  const goToNextScreen = async (data: any) => {
    if (startNewOrder) {
      addItemsToOrder(data);
    }
    if (deliveryData) {
      setLoading(true)
      addDeliveryDataToOrder(data);
      await updateDeliverySchedule(data.scheduleId)
    }
    if (discountData) {
      addDiscountTypeToOrder();
    }
    navigate("CheckoutStacks", { screen: nextScreen });
    setLoading(false);
  };

  if (loading) {
    return <Loader />
  }

  return (
    <Button
      title={
        startNewOrder
          ? "Hacer Pedido"
          : `Continuar ${title && formatPrice(title)}`
      }
      onPress={
        handleSubmit ? handleSubmit(goToNextScreen) : () => goToNextScreen(data)
      }
      containerStyle={primaryButtonStyles.container}
      buttonStyle={primaryButtonStyles.button}
      titleStyle={[theme.textVariants.button, primaryButtonStyles.text]}
    />
  );
};

export default ContinueButton;
