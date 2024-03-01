import { useNavigation } from "@react-navigation/native";
import { Address, Store } from "fork-business-library";
import React, { useContext, useEffect, useReducer } from "react";
import { getCart } from "../api/cart";
import { useCartContext } from "./CartContext";
import { useConfigContext } from "./ConfigContext";
import initialState from "./initialStates/DeliveryInitialState";
import {
  AddressRadioButton,
  deliveryContextValue,
  StoreRadioButton,
} from "./interfaces/DeliveryContextValue";
import {
  CHECK_DELIVERY_RADIOBUTTON,
  CLOSE_DELIVERY_MODAL,
  CLOSE_MISSING_PRODUCTS_MODAL,
  CREATE_DELIVERY_RADIOBUTTONS,
  DELIVERY_CONFIG_UPDATE_END,
  DELIVERY_CONFIG_UPDATE_START,
  OPEN_DELIVERY_MODAL,
  OPEN_MISSING_PRODUCTS_MODAL,
  SHOW_DELIVERY_RADIOBUTTONS,
} from "./reducers/actions";
import reducer from "./reducers/DeliveryReducer";
import * as Analytics from 'expo-firebase-analytics';

const DeliveryContext = React.createContext<deliveryContextValue>({
  ...initialState,
  checkRadioButton() {},
  splitRadioButtons() {},
  hideLoader() {},
  handlePressContinue() {},
  closeDeliveryModal() {},
  closeMissingProductsModal() {},
  saveChanges() {},
});

export const DeliveryProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { stores, addresses, config, updateDeliveryConfig } =
    useConfigContext();
  const { user } = useConfigContext();
  const { cart } = useCartContext();
  const { goBack } = useNavigation<any>();

  const createRadioButtons = () => {
    const data: (Store | Address)[] = [...stores, ...addresses];
    const radioButtons = data.map((item) => {
      if ("streetAndNumber" in item) {
        if (item.id === config.addressId && config.delivery === "DELIVERY") {
          return { ...item, checked: true };
        }
      }
      if ("address" in item) {
        if (item.id === config.storeId && config.delivery === "PICKUP") {
          return { ...item, checked: true };
        }
      }
      return { ...item, checked: false };
    });

    dispatch({ type: CREATE_DELIVERY_RADIOBUTTONS, payload: radioButtons });
  };

  const splitRadioButtons = (
    arr: (AddressRadioButton | StoreRadioButton)[]
  ) => {
    return arr.reduce(
      (acc, curr: any) => {
        if (curr.streetAndNumber) {
          acc.addressRadioButtons = [...acc.addressRadioButtons, curr];
        } else {
          acc.storeRadioButtons = [...acc.storeRadioButtons, curr];
        }
        return acc;
      },
      {
        addressRadioButtons: [] as AddressRadioButton[],
        storeRadioButtons: [] as StoreRadioButton[],
      }
    );
  };

  const hideLoader = () => {
    new Promise((r) => setTimeout(r, 700)).then(() => {
      dispatch({ type: SHOW_DELIVERY_RADIOBUTTONS });
    });
  };

  const checkRadioButton = (index: number) => {
    dispatch({ type: CHECK_DELIVERY_RADIOBUTTON, payload: index });
  };

  const handlePressContinue = async (goBack: any) => {
    const checked = state.radioButtons.find(
      (item: any) => item.checked === true
    );
    if (
      (config.delivery === "PICKUP" && checked.id === config.storeId) ||
      (config.delivery === "DELIVERY" && checked.id === config.addressId)
    ) {
      goBack();
      return null;
    }

    if (cart.productsQuantity > 0) {
      let response;
      if (checked.storeId) {
        response = await getCart(checked.storeId);
        if (response.missingProducts.length > 0) {
          dispatch({
            type: OPEN_MISSING_PRODUCTS_MODAL,
            payload: {
              missingProducts: response.missingProducts,
              checkedItem: checked,
            },
          });
        } else {
          dispatch({ type: OPEN_DELIVERY_MODAL, payload: checked });
        }
      } else {
        response = await getCart(checked.id);
        if (response.missingProducts.length > 0) {
          dispatch({
            type: OPEN_MISSING_PRODUCTS_MODAL,
            payload: {
              missingProducts: response.missingProducts,
              checkedItem: checked,
            },
          });
        } else {
          dispatch({ type: OPEN_DELIVERY_MODAL, payload: checked });
        }
      }
    } else {
      dispatch({ type: OPEN_DELIVERY_MODAL, payload: checked });
    }

    Analytics.logEvent('select_delivery_app', {
      deilvery_type: config.delivery
    });
  };

  const closeDeliveryModal = () => {
    dispatch({ type: CLOSE_DELIVERY_MODAL });
  };

  const closeMissingProductsModal = () => {
    dispatch({ type: CLOSE_MISSING_PRODUCTS_MODAL });
  };

  const saveChanges = async (typeModal: string, data: any) => {
    dispatch({ type: DELIVERY_CONFIG_UPDATE_START });
    if (data.streetAndNumber) {
      updateDeliveryConfig({
        address_id: data.id,
        delivery: "DELIVER",
        store_id: data.storeId,
      });
    }
    if (data.address) {
      updateDeliveryConfig({
        address_id: 0,
        delivery: "TO_GO",
        store_id: data.id,
      });
    }

    setTimeout(
      () => {
        typeModal === "MissingProducts"
          ? closeMissingProductsModal()
          : closeDeliveryModal();
        dispatch({ type: DELIVERY_CONFIG_UPDATE_END });
        goBack();
      },
      typeModal === "MissingProducts" ? 1200 : 1000
    );
  };

  useEffect(() => {
    createRadioButtons();
    // let isMounted = true;
    // if (isMounted === true) {
    //   createRadioButtons();
    // }
    // return () => {
    //   isMounted = false;
    // };
  }, [user.registered, addresses, stores]);

  return (
    <DeliveryContext.Provider
      value={{
        ...state,
        checkRadioButton,
        splitRadioButtons,
        hideLoader,
        handlePressContinue,
        closeDeliveryModal,
        closeMissingProductsModal,
        saveChanges,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDeliveryContext = () => useContext(DeliveryContext);
