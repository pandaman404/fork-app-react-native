import { CartProduct } from "fork-business-library";

export const formatPrice = (price: number | string) => {
  const arrWithDots = [...price.toString()].reverse().reduce(
    (acc, curr, i) => {
      if (i % 3 === 0 && i > 0) {
        acc = [...acc, "."];
      }
      acc = [...acc, curr];
      return acc;
    },
    [""]
  );

  const formatedPrice = `$${arrWithDots.reverse().join("")}`;
  return formatedPrice;
};

export const capitalizeText = (text: string) => {
  const formatedText = text.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  return formatedText;
};

export const sortCartProducts = (products: CartProduct[]) => {
  return products.sort((a: CartProduct, b: CartProduct) =>
    a.name.localeCompare(b.name)
  );
};
