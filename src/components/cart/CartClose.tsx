import { useContext } from "react";
import { StateContext } from "@/libs/reducer";

interface CartCloseProps {
  img: string;
}

export const CartClose = ({ img }: CartCloseProps) => {
  const { dispatch } = useContext(StateContext);

  return (
    <div className="cart-button" onClick={() => dispatch({ type: "USE_CART" })}>
      <img src={img} alt="cart" className="cart-button-img" />
    </div>
  );
};