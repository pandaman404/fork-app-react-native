import React, { useContext, useEffect, useReducer } from "react";
import initialState from "./initialStates/ConfigInitialState";
import { ConfigContextValue } from "./interfaces/ConfigContextValue";
import reducer from "./reducers/ConfigReducer";
import {
  AUTH_USER_END,
  AUTH_USER_ERROR,
  AUTH_USER_START,
  AUTH_USER_SUBMIT,
  CHANGE_USER_LOGOUT,
  FETCH_CATEGORIES,
  RESET_GUEST_PRODUCTS,
  SET_GLOBAL_DATA,
  UPDATE_ADDRESSES,
  UPDATE_DELIVERY_CONFIG,
  UPDATE_USER,
} from "./reducers/actions";
import { storeData, removeData } from "../utils/storage";
import {
  deleteAddress,
  getAddresses,
  getConfiguration,
  getCurrent,
  getDiscounts,
  getGuest,
  getStores,
  postLogin,
  postRegister,
  putConfiguration,
} from "../api/user";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getCategories } from "../api/category";
import * as Analytics from 'expo-firebase-analytics';

const ConfigContext = React.createContext<ConfigContextValue>({
  ...initialState,
  onLoginSubmit() {},
  onLogoutSubmit() {},
  onRegisterSubmit() {},
  updateDeliveryConfig() {},
  showCurrentDelivery() {},
  updateUser() {},
  updateAddresses() {},
  fetchCategories() {},
  handleDeleteAddress() {},
});

export const ConfigProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { goBack, navigate } = useNavigation<any>();
  // const { addresses, stores, config } = state;

  const setGlobalData = async () => {
    const user = await getCurrent();
    const config = await getConfiguration();
    const stores = await getStores();
    const addresses = await getAddresses();
    let categories = await getCategories(config.storeId);

    const payload = [user, config, stores, addresses, categories];

    dispatch({ type: SET_GLOBAL_DATA, payload });
  };

  const updateDeliveryConfig = async (data: any) => {
    try {
      const deliveryConfig = await putConfiguration(data);
      dispatch({ type: UPDATE_DELIVERY_CONFIG, payload: deliveryConfig });
    } catch (error) {
      console.log(error);
    }
  };

  const updateAddresses = async () => {
    try {
      const updatedAddresses = await getAddresses();
      dispatch({ type: UPDATE_ADDRESSES, payload: updatedAddresses });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id);
      await updateAddresses();
    } catch (error) {
      console.log(error);
    }
  };

  const showCurrentDelivery = () => {
    const { addresses, stores, config } = state;
    if (config.delivery === "DELIVERY") {
      const address = addresses.find(
        (item: any) => item.id === config.addressId
      );
      return (
        address && {
          address: address.streetAndNumber,
          name: address.name,
          text: `Fork lo lleva a ${address.name}`,
        }
      );
    }
    if (config.delivery === "PICKUP") {
      const store = stores.find((item: any) => item.id === config.storeId);
      return (
        store && {
          address: store.address,
          name: store.name,
          text: `Retiras en tienda ${store.name}`,
        }
      );
    } else {
      return null;
    }
  };

  const handleAuthSuccess = async (token: string) => {
    await storeData("@auth_token", token);
    const user = await getCurrent();
    // const config = await getConfiguration();
    const config = {
      delivery: "PICKUP",
      storeId: state.config.storeId,
      store: null,
      addressId: 0,
      address: null,
      isDefault: false,
    };
    await updateDeliveryConfig({
      address_id: 0,
      delivery: "TO_GO", // Por la API hay que mandar "TO_GO" en lugar de "PICKUP"
      store_id: state.config.storeId,
    });
    const addresses = await getAddresses();
    const discounts = await getDiscounts();
    const payload = [user, config, addresses, discounts];

    await Analytics.logEvent('session_start_app');

    dispatch({ type: AUTH_USER_SUBMIT, payload });
  };

  const handleAuthError = (response: string) => {
    dispatch({ type: AUTH_USER_ERROR, payload: response });
    setTimeout(() => dispatch({ type: AUTH_USER_ERROR, payload: "" }), 1500);
  };

  const onLoginSubmit = async (data: any) => {
    Keyboard.dismiss();
    try {
      dispatch({ type: AUTH_USER_START });
      let response = await postLogin(data);
      if (response && response.registered) {
        handleAuthSuccess(response.token);
        setTimeout(() => {
          dispatch({ type: AUTH_USER_END });
          goBack();
        }, 800);
        Analytics.logEvent('log_in_app');
      }
    } catch (error: any) {
      handleAuthError(error.message);
      dispatch({ type: AUTH_USER_END });
    }
  };

  const onRegisterSubmit = async (data: any) => {
    Keyboard.dismiss();
    try {
      dispatch({ type: AUTH_USER_START });
      await removeData("@auth_token");
      let response = await postRegister(data);
      if (response && response.registered) {
        handleAuthSuccess(response.token);
        setTimeout(() => {
          dispatch({ type: AUTH_USER_END });
          navigate("HomeScreen");
        }, 800);
        Analytics.logEvent('log_user_app');
      }
    } catch (error: any) {
      handleAuthError(error.message);
      dispatch({ type: AUTH_USER_END });
    }
  };

  const onLogoutSubmit = async () => {
    try {
      dispatch({ type: AUTH_USER_START });
      await removeData("@auth_token");
      const guest = await getGuest();
      handleAuthSuccess(guest.token);
      dispatch({ type: CHANGE_USER_LOGOUT });
      setTimeout(() => {
        dispatch({ type: AUTH_USER_END });
      }, 800);
      Analytics.logEvent('log_out_app');
    } catch (error: any) {
      console.log(error);
      dispatch({ type: AUTH_USER_END });
    }
  };

  const updateUser = (
    email: string,
    name: string,
    lastName: string,
    phoneNumber: string
  ) => {
    dispatch({
      type: UPDATE_USER,
      payload: { email, name, lastName, phoneNumber },
    });
    Analytics.logEvent('edit_profile_app');
  };

  const fetchCategories = async (storeId: number) => {
    let payload = await getCategories(storeId);
    dispatch({
      type: FETCH_CATEGORIES,
      payload,
    });
  };

  useEffect(() => {
    setGlobalData();
    // let isMounted = true;
    // if (isMounted === true) {
    // }
    // return () => {
    //   isMounted = false;
    // };
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        ...state,
        onLoginSubmit,
        onLogoutSubmit,
        onRegisterSubmit,
        updateDeliveryConfig,
        updateAddresses,
        showCurrentDelivery,
        updateUser,
        fetchCategories,
        handleDeleteAddress,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfigContext = () => useContext(ConfigContext);
