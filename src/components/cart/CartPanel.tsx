import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { CartItem } from "@/components/cart/CartItem";
import { CartClose } from "@/components/cart/CartClose";
import { StateContext } from "@/libs/reducer";
import { totalPrice } from "@/libs/utils";
import { Products } from "@/libs/types";
import { Price } from "@/components/Price";
import productsData from "@/data/products.json";
import close from "@/assets/close.svg";
import logo from "@/assets/logo.svg";

const products: Products = productsData;

const Payment = () => {
  return (
    <div className="cart-payment">
      <div className="cart-reactpay">
        <img src={logo} alt={logo} className="cart-payment-img" />
        <div>Pay</div>
      </div>
      <div className="cart-reactpal">ReactPal</div>
    </div>
  );
};

export const CartPanel = () => {
  const { state } = useContext(StateContext);

  if (state.cart === undefined) return;

  const { t } = useTranslation();

  const cart = Object.entries(state.cart).map((product) => {
    const [cartId, productAmount] = product;
    const [productCategory, productId] = cartId.split("_");

    return (
      <CartItem
        product={products[productCategory][productId]}
        amount={productAmount}
        id={cartId}
        key={cartId}
      />
    );
  });

  return (
    <>
      <div className="cart-header">
        <div>{t("cart")}</div>
        <CartClose img={close} />
      </div>
      <div className="cart-items">{cart}</div>
      <div className="cart-total">
        <div>{t("total")}</div>
        <Price
          cssClass={"item-price"}
          price={totalPrice(products, state.cart)}
        />
      </div>
      <Payment />
    </>
  );
};