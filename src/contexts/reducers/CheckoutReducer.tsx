import { OrderItem } from "../../api/cart";
import {
  GO_TO_CHECKOUT_DELIVERY,
  GO_TO_CHECKOUT_DISCOUNTS,
  GO_TO_CHECKOUT_PAYMENT,
  PREPARE_ORDER,
  RESET_ORDER,
  TOGGLE_CHECKOUT_LOADER,
} from "./actions";

const CheckoutReducer = (state: any, action: any) => {
  if (action.type === GO_TO_CHECKOUT_DELIVERY) {
    const { newOrder } = state;
    newOrder.items = action.payload;
    return { ...state, newOrder };
  }
  if (action.type === GO_TO_CHECKOUT_DISCOUNTS) {
    const { newOrder } = state;
    newOrder.storeId = action.payload.storeId;
    newOrder.addressId = action.payload.addressId;
    newOrder.distribution = action.payload.distribution;
    newOrder.isGift = action.payload.isGift;
    newOrder.phone = action.payload.phone;
    newOrder.comment = action.payload.comment;
    newOrder.scheduleId = action.payload.scheduleId;
    return { ...state, newOrder };
  }
  if (action.type === GO_TO_CHECKOUT_PAYMENT) {
    const { newOrder } = state;
    newOrder.discountType = action.payload;
    return { ...state, newOrder };
  }
  if (action.type === PREPARE_ORDER) {
    const { newOrder } = state;
    const { paymentId, walletEnabled } = action.payload;
    newOrder.paymentId = paymentId;
    newOrder.usesWallet = walletEnabled;
    return { ...state, newOrder };
  }
  if (action.type === RESET_ORDER) {
    let { newOrder } = state;
    newOrder = {
      storeId: 0,
      addressId: 0,
      distribution: "PICKUP",
      paymentId: 0,
      usesWallet: false,
      isGift: false,
      scheduleId: null,
      discountType: "",
      comment: "",
      phone: "",
      items: [] as OrderItem[],
    };
    return { ...state, newOrder };
  }
  if (action.type === TOGGLE_CHECKOUT_LOADER) {
    let { isLoading } = state;
    isLoading = !isLoading;
    return { ...state, isLoading };
  }
  return state;
};

export default CheckoutReducer;
