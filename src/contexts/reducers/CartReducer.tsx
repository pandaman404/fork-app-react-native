import { CartProduct, CartProductData } from "fork-business-library";
import { sortCartProducts } from "../../utils/sortElements";
import {
  UPDATE_CART_DATA,
  UPDATE_CART_IS_BUSY,
  UPDATE_CREDIT_CARD,
  HANDLE_GUEST_PRODUCTS,
  TOGGLE_DISCOUNT_MESSAGE,
  RESET_GUEST_PRODUCTS,
} from "./actions";

const cartReducer = (state: any, action: any) => {
  if (action.type === UPDATE_CART_DATA) {
    let cart = action.payload;
    cart.products = sortCartProducts(cart.products);
    return { ...state, cart };
  }
  if (action.type === UPDATE_CART_IS_BUSY) {
    let { isBusy } = state;
    isBusy = !isBusy;
    return { ...state, isBusy };
  }
  if (action.type === HANDLE_GUEST_PRODUCTS) {
    return { ...state, guestCartProducts: action.payload };
  }
  if (action.type === RESET_GUEST_PRODUCTS) {
    return { ...state, guestCartProducts: [] as CartProduct[] };
  }
  if (action.type === TOGGLE_DISCOUNT_MESSAGE) {
    return { ...state, discountAlert: action.payload };
  }
  if (action.type === UPDATE_CREDIT_CARD) {
    const { cart } = state;
    cart.payments = action.payload;
    return { ...state, cart };
  }

  return state;
};

export default cartReducer;
