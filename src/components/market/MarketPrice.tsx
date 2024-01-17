import { useContext } from "react";
import { StateContext } from "@/libs/reducer";
import { Price } from "@/components/Price";
import { Product } from "@/libs/types";
import { price } from "@/libs/utils";
import incart from "@/assets/cart.svg";

const InCart = () => <img src={incart} alt="cart" className="item-cart" />;

interface MarketPriceProps {
  product: Product;
  id: string;
}

export const MarketPrice = ({ product, id }: MarketPriceProps) => {
  const { state } = useContext(StateContext);

  if (state.cart === undefined) return;

  return (
    <div className="container-row">
      <Price cssClass={"item-price"} price={price(product, 1)} />
      {product.discount !== 0 && (
        <Price cssClass={"item-price-old"} price={product.price / 100} />
      )}
      {id in state.cart && <InCart />}
    </div>
  );
};