import {
  CartProduct,
  CartProductData,
  DiscountResult,
  DiscountType,
} from "fork-business-library";
import React, { useContext, useEffect, useReducer } from "react";
import { getCart, updateCart, updateDiscounts } from "../api/cart";
import { useConfigContext } from "./ConfigContext";
import initialState from "./initialStates/CartInitialState";
import { CartContextValue } from "./interfaces/CartContextValue";
import {
  HANDLE_GUEST_PRODUCTS,
  RESET_GUEST_PRODUCTS,
  TOGGLE_DISCOUNT_MESSAGE,
  UPDATE_CART_DATA,
  UPDATE_CART_IS_BUSY,
  UPDATE_CREDIT_CARD,
} from "./reducers/actions";
import reducer from "./reducers/CartReducer";
import * as Analytics from 'expo-firebase-analytics';


const CartContext = React.createContext<CartContextValue>({
  ...initialState,
  getProductQuantityAndStatusInScreen() {},
  addProductToCart() {},
  removeProductFromCart() {},
  addPromoCode() {},
  updateDiscountInCart() {},
  clearCart() {},
  updateUseWalletInCart() {},
  updateDeliverySchedule() {},
  resetGuestProducts() {},
  updateCreditCard() {},
});

export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let { cart, guestCartProducts } = state;
  const { user, config } = useConfigContext();

  const mapCartProducts = (cartProducts: CartProduct[]) => {
    return cartProducts.map((item: CartProduct) => {
      return {
        sku: item.sku,
        quantity: item.quantity,
        pack:
          item.packProducts.length > 0
            ? item.packProducts.map((i: any) => ({
              sku: i.sku,
              quantity: i.quantity,
            }))
            : null,
      };
    });
  };

  const setCartData = async () => {
    if (config.storeId > 0) {
      const cart = await getCart(config.storeId);
      if (guestCartProducts.length > 0) {
        const updatedGuestCart = await updateCart(
          config.storeId,
          config.delivery,
          cart.discountType,
          null,
          false,
          mapCartProducts(guestCartProducts)
        );
        dispatch({
          type: UPDATE_CART_DATA,
          payload: updatedGuestCart,
        });
      } else {
        dispatch({ type: UPDATE_CART_DATA, payload: cart });
      }
    }
  };

  const productExistsInCart = (
    cartArr: CartProductData[],
    newProduct: CartProductData
  ) => {
    let productFound = cartArr.find(
      (item: CartProductData) => item.sku === newProduct.sku
    );
    if (productFound && !productFound.pack) {
      return true;
    }
    if (
      productFound &&
      newProduct.pack &&
      productFound.sku === newProduct.sku
    ) {
      return verifyIsSamePack(productFound, newProduct);
    }
    return false;
  };

  const verifyIsSamePack = (
    packInCart: CartProductData,
    candidatePack: CartProductData
  ) => {
    let pack1 = packInCart.pack!.sort((a, b) => (a.sku > b.sku ? 1 : -1));
    let pack2 = candidatePack.pack!.sort((a, b) => (a.sku > b.sku ? 1 : -1));
    return JSON.stringify(pack1) === JSON.stringify(pack2);
  };

  const addProductToCart = async (product: CartProductData) => {
    dispatch({ type: UPDATE_CART_IS_BUSY });
    let cartProductPutData: CartProductData[] = mapCartProducts(cart.products);

    if (productExistsInCart(cartProductPutData, product)) {
      cartProductPutData = cartProductPutData.map((element: any) => {
        if (element.sku === product.sku) {
          element.quantity += 1;
        }
        return element;
      });
    } else {
      cartProductPutData = [...cartProductPutData, product];
    }

    const updatedCart = await updateCart(
      config.storeId,
      config.delivery,
      cart.discountType,
      null,
      false,
      cartProductPutData
    );

    if (!user.registered) {
      let guestCartData = updatedCart.products;
      dispatch({ type: HANDLE_GUEST_PRODUCTS, payload: guestCartData });
    }
    dispatch({ type: UPDATE_CART_DATA, payload: updatedCart });

    dispatch({ type: UPDATE_CART_IS_BUSY });
    await Analytics.logEvent('add_to_cart_app', {
      sku: product.sku,
      stock: product.quantity
    });
  };

  const removeProductFromCart = async (product: CartProductData) => {
    dispatch({ type: UPDATE_CART_IS_BUSY });
    let cartProductPutData = cart.products.reduce((acc: any, curr: any) => {
      let item = {
        sku: curr.sku,
        quantity: curr.quantity,
        pack:
          curr.packProducts.length > 0
            ? curr.packProducts.map((i: any) => ({
              sku: i.sku,
              quantity: i.quantity,
            }))
            : null,
      };

      if (item.sku === product.sku && !item.pack) {
        item.quantity -= 1;
      }

      if (item.sku === product.sku && item.pack && product.pack) {
        if (verifyIsSamePack(item, product)) {
          item.quantity -= 1;
        }
      }

      if (item.quantity === 0) {
        return acc;
      }
      return [...acc, item];
    }, [] as CartProductData[]);

    const updatedCart = await updateCart(
      config.storeId,
      config.delivery,
      cart.discountType,
      null,
      false,
      cartProductPutData
    );

    if (!user.registered) {
      let guestCartData = updatedCart.products;
      dispatch({ type: HANDLE_GUEST_PRODUCTS, payload: guestCartData });
    }

    dispatch({ type: UPDATE_CART_DATA, payload: updatedCart });
    dispatch({ type: UPDATE_CART_IS_BUSY });
    await Analytics.logEvent('remove_from_cart_app', {
      sku: product.sku,
      stock: product.quantity
    });
  };

  const getProductQuantityAndStatusInScreen = (sku: string) => {
    const cartItem = state.cart.products.find(
      (item: CartProduct) => item.sku === sku
    );
    if (cartItem) {
      return {
        sku,
        quantity: cartItem.quantity,
        canAddMore: cartItem.canAddMore,
      };
    } else {
      return {
        sku,
        quantity: 0,
      };
    }
  };

  const clearCart = async () => {
    const updatedCart = await updateCart(
      config.storeId,
      config.delivery,
      cart.discountType,
      null,
      false,
      [] as CartProductData[]
    );
    dispatch({ type: UPDATE_CART_DATA, payload: updatedCart });
  };

  const updateDiscountInCart = async (discountType: DiscountType) => {
    let cartProductPutData: CartProductData[] = mapCartProducts(cart.products);

    const updatedCart = await updateCart(
      config.storeId,
      config.delivery,
      discountType,
      null,
      false,
      cartProductPutData
    );
    dispatch({ type: UPDATE_CART_DATA, payload: updatedCart });
  };

  const addPromoCode = async (promoCode: any) => {
    try {
      let discountResult: DiscountResult = await updateDiscounts(
        promoCode,
        config.storeId
      );

      dispatch({ type: UPDATE_CART_DATA, payload: discountResult.cart });
      dispatch({
        type: TOGGLE_DISCOUNT_MESSAGE,
        payload: { code: discountResult.code, message: discountResult.message },
      });

      setTimeout(() => {
        dispatch({
          type: TOGGLE_DISCOUNT_MESSAGE,
          payload: {},
        });
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUseWalletInCart = async (useWallet: boolean) => {
    let cartProductPutData: CartProductData[] = mapCartProducts(cart.products);
    const updatedCart = await updateCart(
      config.storeId,
      config.delivery,
      cart.discountType,
      null,
      useWallet,
      cartProductPutData
    );
    dispatch({ type: UPDATE_CART_DATA, payload: updatedCart });
  };

  const updateDeliverySchedule = async (scheduleId: string) => {
    let cartProductPutData: CartProductData[] = mapCartProducts(cart.products);
    const updatedCart = await updateCart(
      config.storeId,
      config.delivery,
      cart.discountType,
      Number(scheduleId),
      cart.wallet.enabled,
      cartProductPutData
    );
    dispatch({ type: UPDATE_CART_DATA, payload: updatedCart });
  };

  const updateCreditCard = async (payments: any[]) => {
    dispatch({ type: UPDATE_CREDIT_CARD, payload: payments });
  };

  const resetGuestProducts = () => {
    dispatch({ type: RESET_GUEST_PRODUCTS });
  };

  useEffect(() => {
    setCartData();
    // let isMounted = true;
    // if (isMounted === true) {
    //   setCartData();
    // }
    // return () => {
    //   isMounted = false;
    // };
  }, [config.storeId, user.token, cart.productsQuantity]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        getProductQuantityAndStatusInScreen,
        removeProductFromCart,
        addPromoCode,
        updateDiscountInCart,
        clearCart,
        updateUseWalletInCart,
        updateDeliverySchedule,
        resetGuestProducts,
        updateCreditCard,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
