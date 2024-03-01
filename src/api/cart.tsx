import {
  CartProductData,
  CartUseCase,
  Discount,
  DiscountType,
  DistributionMode,
} from "fork-business-library";

export interface Order {
  storeId: number;
  distribution: DistributionMode;
  paymentId: number;
  usesWallet: boolean;
  isGift: boolean;
  addressId: number | null;
  scheduleId: number | null;
  discountType: DiscountType;
  comment: string;
  phone: string;
  items: any;
}

export interface OrderItem {
  sku: string;
  quantity: number;
  pack: [{ sku: string; quantity: number }] | [];
}

const cartUseCase = new CartUseCase();

export const getCart = async (storeId: number) => {
  return await cartUseCase.getCart(storeId);
};

export const updateCart = async (
  storeId: number,
  distribution: DistributionMode,
  discount: DiscountType,
  scheduleId: number | null,
  usesWallet: boolean,
  products: CartProductData[]
) => {
  return await cartUseCase.putCart({
    storeId,
    distribution,
    discount,
    scheduleId,
    usesWallet,
    products,
  });
};

export const updateDiscounts = async (code: string, storeId: number) => {
  return await cartUseCase.validateDiscount(code, storeId).catch((e) => e);
};

export const createOrder = async (order: Order) => {
  const response = await cartUseCase.createOrder(
    order.storeId,
    order.distribution,
    order.paymentId,
    order.usesWallet,
    order.isGift,
    order.addressId,
    order.scheduleId,
    order.discountType,
    order.comment,
    order.phone,
    order.items
  );
  return response;
};

export const getShedules = async (storeId: number) => {
  return await cartUseCase.getSchedules(storeId);
};
