import { Cart } from "fork-business-library";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatText";
import { updateRadioButtonsState } from "../utils/handleRadioButtons";
import * as Analytics from "expo-firebase-analytics";

const usePaymentMethods = (
  cart: Cart,
  updateUseWalletInCart: any,
  toggleCheckoutLoader: any,
  addPaymentMethodToOrder: any
) => {
  const [radioButtons, setRadioButtons] = useState(
    cart.payments.map((payment) => {
      if (payment.id === 4) {
        return { ...payment, checked: true };
      }
      return { ...payment, checked: false };
    })
  );
  const [pesosFork, setPesosFork] = useState(false);
  const [showCompletedOrderModal, setShowCompletedOrderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const togglePaymentRadioButtons = (id: number) => {
    const radioButtonsData = updateRadioButtonsState(radioButtons, id);
    setRadioButtons(radioButtonsData);
    const payment_selected = radioButtons.find((item) => item.id === id);
    Analytics.logEvent("select_payment_app", {
      payment_id: id,
      payment_title: payment_selected && payment_selected.description,
    });
  };

  const togglePesosFork = () => {
    setPesosFork((pesosFork) => !pesosFork);
  };

  const handleUseWallet = async () => {
    toggleCheckoutLoader();
    await updateUseWalletInCart(pesosFork);
    toggleCheckoutLoader();
  };

  useEffect(() => {
    setRadioButtons(
      cart.payments.map((payment, i) => {
        if (radioButtons[i].checked) {
          return { ...payment, checked: true };
        }
        return { ...payment, checked: false };
      })
    );
  }, [cart.payments]);

  const getCurrentDiscount = () => {
    const discount = cart.discounts.find(
      (discount) => discount.type === cart.discountType
    );

    if (discount) {
      let formattedName = `${discount.name.substring(0, 38)}${
        discount.name.length > 38 ? "..." : ""
      }`;
      return {
        name: formattedName,
        value: `-${formatPrice(cart.totalDescuentos)}`,
      };
    }
    return {
      name: "",
      value: `-${formatPrice(cart.totalDescuentos)}`,
    };
  };

  const toggleCompletedOrderModal = () => {
    setShowCompletedOrderModal(!showCompletedOrderModal);
  };

  const handleWebPaymentModal = (url: string) => {
    setPaymentUrl(url);
    setShowPaymentModal(true);
  };

  useEffect(() => {
    handleUseWallet();
  }, [pesosFork]);

  useEffect(() => {
    if (cart.wallet.usedTotal === cart.totalDescuentos) {
      addPaymentMethodToOrder(5, true);
    }
    if (
      cart.wallet.usedTotal > 0 &&
      cart.wallet.usedTotal < cart.totalDescuentos
    ) {
      const checkedRadioButton = radioButtons.find(
        (item: any) => item.checked === true
      );
      addPaymentMethodToOrder(checkedRadioButton!.id, true);
    }
    if (!cart.wallet.enabled) {
      const checkedRadioButton = radioButtons.find(
        (item: any) => item.checked === true
      );
      addPaymentMethodToOrder(checkedRadioButton!.id, false);
    }
  }, [radioButtons, cart.wallet]);

  return {
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
  };
};

export default usePaymentMethods;
