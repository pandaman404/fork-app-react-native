import React, { useContext, useReducer } from "react";
import initialState from "./initialStates/CheckoutInitialState";
import reducer from "./reducers/CheckoutReducer";
import { CheckoutContextValue } from "./interfaces/CheckoutContextValue";
import { CartProduct } from "fork-business-library";
import {
  GO_TO_CHECKOUT_DELIVERY,
  GO_TO_CHECKOUT_DISCOUNTS,
  GO_TO_CHECKOUT_PAYMENT,
  PREPARE_ORDER,
  RESET_ORDER,
  TOGGLE_CHECKOUT_LOADER,
} from "./reducers/actions";
import { useConfigContext } from "./ConfigContext";
import { useCartContext } from "./CartContext";
import { createOrder } from "../api/cart";
import * as Analytics from 'expo-firebase-analytics';

const CheckoutContext = React.createContext<CheckoutContextValue>({
  ...initialState,
  addItemsToOrder() {},
  addDeliveryDataToOrder() {},
  addDiscountTypeToOrder() {},
  addPaymentMethodToOrder() {},
  createNewOrder() {},
  resetCheckout() {},
  toggleCheckoutLoader() {},
});

export const CheckoutProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { config } = useConfigContext();
  const { cart, clearCart } = useCartContext();

  const addItemsToOrder = (data: CartProduct[]) => {
    const orderItems = data.map((item) => {
      return {
        sku: item.sku,
        quantity: item.quantity,
        pack:
          item.packProducts.length > 0
            ? item.packProducts.map((i: any) => ({
              sku: i.sku,
              quantity: i.quantity,
            }))
            : [],
      };
    });

    dispatch({ type: GO_TO_CHECKOUT_DELIVERY, payload: orderItems });
  };

  const addDeliveryDataToOrder = (data: any) => {
    data = {
      ...data,
      storeId: config.storeId,
      addressId: config.addressId,
      distribution: config.delivery,
    };
    dispatch({ type: GO_TO_CHECKOUT_DISCOUNTS, payload: data });
  };

  const addDiscountTypeToOrder = () => {
    dispatch({ type: GO_TO_CHECKOUT_PAYMENT, payload: cart.discountType });
  };

  const addPaymentMethodToOrder = (
    paymentId: number,
    walletEnabled: boolean
  ) => {
    dispatch({ type: PREPARE_ORDER, payload: { paymentId, walletEnabled } });
  };

  const resetOrder = () => {
    dispatch({ type: RESET_ORDER });
  };

  const toggleCheckoutLoader = () => {
    dispatch({ type: TOGGLE_CHECKOUT_LOADER });
  };

  const createNewOrder = async () => {
    dispatch({ type: TOGGLE_CHECKOUT_LOADER });
    try {
      const order = await createOrder(state.newOrder);
      Analytics.logEvent('purchase_app');
      if (state.newOrder.paymentId === 5 || state.newOrder.paymentId > 10) {
        await clearCart(); // revisar
        resetOrder();
        dispatch({ type: TOGGLE_CHECKOUT_LOADER });
        return null;
      } else {
        const url = order.getPaymentURL();
        dispatch({ type: TOGGLE_CHECKOUT_LOADER });
        return url;
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: TOGGLE_CHECKOUT_LOADER });
      return error;
    }
  };

  const resetCheckout = async () => {
    try {
      await clearCart(); // revisar
      resetOrder();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        ...state,
        addItemsToOrder,
        addDeliveryDataToOrder,
        addDiscountTypeToOrder,
        addPaymentMethodToOrder,
        createNewOrder,
        resetCheckout,
        toggleCheckoutLoader,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => useContext(CheckoutContext);
