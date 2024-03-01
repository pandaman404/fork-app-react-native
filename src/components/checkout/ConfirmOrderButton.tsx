import React, { useState } from "react";
import { Button } from "react-native-elements";
import { formatPrice } from "../../utils/formatText";
import { primaryButtonStyles } from "../../styles/buttons";
import { theme } from "../../styles/theme";
import Loader from "../shared/Loader";
import CustomAlert from "../shared/CustomAlert";
import * as Analytics from "expo-firebase-analytics";
import { useCheckoutContext } from "../../contexts/CheckoutContext";

const ConfirmOrderButton = ({
  cartTotal,
  isLoading,
  openWebPayment,
  toggleCompletedOrderModal,
  navigate,
}: any) => {
  const [error, setError] = useState("");
  const { newOrder, createNewOrder } = useCheckoutContext();

  const handleCreateOrder = async () => {
    Analytics.logEvent("purchase_app");
    if (newOrder.paymentId === 3) {
      navigate("ProfileStacks", {
        screen: "ProfileScreen",
        params: {
          screen: "Tarjeta de Crédito",
        },
      });
    } else {
      try {
        const response: any = await createNewOrder(newOrder);
        if (newOrder.paymentId === 5 || newOrder.paymentId > 10) {
          toggleCompletedOrderModal();
        } else {
          if (typeof response === "string" && response.length > 0) {
            openWebPayment(response);
          }
          if (response && response.code) {
            setError(response.message);
            setTimeout(() => setError(""), 3500);
            Analytics.logEvent("purchase_fail_app", {
              server_reason: response.message,
            });
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {error.length > 0 && <CustomAlert text={error} positionY={"105%"} />}
      <Button
        title={`Confirmar Pedido ${formatPrice(cartTotal)}`}
        onPress={() => handleCreateOrder()}
        containerStyle={primaryButtonStyles.container}
        buttonStyle={primaryButtonStyles.button}
        titleStyle={[theme.textVariants.button, primaryButtonStyles.text]}
        disabled={isLoading}
      />
    </>
  );
};

export default ConfirmOrderButton;
