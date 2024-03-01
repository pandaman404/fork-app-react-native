import { CartProduct } from "fork-business-library";

export const sortCartProducts = (products: CartProduct[]) => {
  return products.sort((a: CartProduct, b: CartProduct) =>
    a.name.localeCompare(b.name)
  );
};
