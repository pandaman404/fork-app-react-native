import { Cart, CartProduct, CartProductData } from "fork-business-library";

const cartInitialState = {
  cart: {} as Cart,
  isBusy: false,
  guestCartProducts: [] as CartProduct[],
  discountAlert: {} as any,
};

export default cartInitialState;
