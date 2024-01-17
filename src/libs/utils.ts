import { Cart, Product, Products } from "@/libs/types";

export const price = (product: Product, amount: number): number => {
  return (((product.price * (100 - product.discount)) / 100) * amount) / 100;
};

export const totalPrice = (products: Products, cart: Cart): number => {
  const totalPrice = Object.entries(cart).reduce((acc, product) => {
    const [cartId, productAmount] = product;
    const [productCategory, productId] = cartId.split("_");

    return (acc += price(products[productCategory][productId], productAmount));
  }, 0);

  return totalPrice;
};

export const debounce = (callback: Function, timer: number): Function => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: string[]) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, timer);
  };
};