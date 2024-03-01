import { Order } from "../../api/cart";

export interface CheckoutContextValue {
  newOrder: Order;
  isLoading: boolean;
  addItemsToOrder: any;
  addDeliveryDataToOrder: any;
  addDiscountTypeToOrder: any;
  addPaymentMethodToOrder: any;
  createNewOrder: any;
  resetCheckout: any;
  toggleCheckoutLoader: any;
}
