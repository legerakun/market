import { useContext } from "react";
import { StateContext } from "@/libs/reducer";

export const CartClose = ({ img }: { img: string }) => {
  const { dispatch } = useContext(StateContext);

  return (
    <div className="cart-button" onClick={() => dispatch({ type: "USE_CART" })}>
      <img src={img} alt="cart" className="cart-button-img" />
    </div>
  );
};