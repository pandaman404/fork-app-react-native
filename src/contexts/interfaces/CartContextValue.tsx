import { Cart, CartProduct, CartProductData } from "fork-business-library";

export interface CartContextValue {
  cart: Cart;
  isBusy: boolean;
  discountAlert: any;
  guestCartProducts: CartProduct[];
  addProductToCart: any;
  removeProductFromCart: any;
  getProductQuantityAndStatusInScreen: any;
  addPromoCode: any;
  updateDiscountInCart: any;
  updateUseWalletInCart: any;
  updateDeliverySchedule: any;
  clearCart: any;
  resetGuestProducts: any;
  updateCreditCard: any;
}
