import { DiscountType, DistributionMode } from "fork-business-library";
import { OrderItem } from "../../api/cart";

const checkoutInitialState = {
  newOrder: {
    addressId: 0,
    storeId: 0,
    distribution: "PICKUP" as DistributionMode,
    paymentId: 0,
    usesWallet: false,
    isGift: false,
    scheduleId: null,
    discountType: "NINGUNO" as DiscountType,
    comment: "",
    phone: "",
    items: [] as OrderItem[],
  },
  isLoading: false,
};

export default checkoutInitialState;
