import { MouseEventHandler, useContext } from "react";
import { StateContext } from "@/libs/reducer";
import { Price } from "@/components/Price";
import { price } from "@/libs/utils";
import { Product } from "@/libs/types";
import trash from "@/assets/delete.svg";

interface ButtonProps {
  text: string;
  action: MouseEventHandler;
}

const Button = ({ text, action }: ButtonProps) => (
  <div className="item-button" onClick={action}>
    {text}
  </div>
);

interface AmountProps {
  amount: number;
  id: string;
  stock: number;
}

const Amount = ({ amount, id, stock }: AmountProps) => {
  const { dispatch } = useContext(StateContext);

  return (
    <div className="item-container">
      <Button
        text={"-"}
        action={() =>
          dispatch({
            type: "DECREASE_CART_ITEM",
            item: id,
          })
        }
      />
      <div className="item-option">{amount}</div>
      <Button
        text={"+"}
        action={() =>
          dispatch({
            type: "INCREASE_CART_ITEM",
            item: id,
            stock: stock,
          })
        }
      />
    </div>
  );
};

interface CartItemProps {
  product: Product;
  amount: number;
  id: string;
}

export const CartItem = ({ product, amount, id }: CartItemProps) => {
  const { dispatch } = useContext(StateContext);

  return (
    <div className="item">
      <img
        className="item-img"
        alt={product.name}
        src={`./products/${product.img}`}
      />
      <div className="item-description">
        <div className="item-name">{product.name}</div>
        <Price cssClass={"item-price"} price={price(product, amount)} />
      </div>
      <Amount amount={amount} id={id} stock={product.stock} />
      <img
        src={trash}
        alt="delete"
        className="item-remove"
        onClick={() => dispatch({ type: "REMOVE_FROM_CART", item: id })}
      />
    </div>
  );
};