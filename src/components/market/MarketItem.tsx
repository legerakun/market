import { useContext, MutableRefObject } from "react";
import { TransitionStatus } from "react-transition-group";
import { MarketPrice } from "@/components/market/MarketPrice";
import { StateContext } from "@/libs/reducer";
import { Product } from "@/libs/types";
import { Styles } from "@/libs/types";

interface MarketItemProps {
  product: Product;
  category: string;
  id: number;
  stage: TransitionStatus;
  nodeRef: MutableRefObject<null>;
}

export const MarketItem = (props: MarketItemProps) => {
  const { state, dispatch } = useContext(StateContext);

  if (state.cart === undefined) return;

  const cartId = props.category + "_" + props.id;

  const styles: Styles = {
    entering: {
      opacity: 1,
      transition: "opacity " + props.id * 100 + "ms ease-in-out",
    },
    entered: {
      opacity: 1,
    },
    exiting: {
      opacity: 0,
      transition: "opacity " + 300 / props.id + "ms ease-in-out",
    },
    exited: {
      opacity: 0,
    },
  };

  const action = cartId in state.cart
    ? () => dispatch({ type: "REMOVE_FROM_CART", item: cartId })
    : () => dispatch({ type: "ADD_TO_CART", item: cartId });

  return (
    <button
      className="product"
      onClick={action}
      style={{ ...styles[props.stage] }}
      ref={props.nodeRef}
    >
      <img
        className="product-img"
        alt={props.product.name}
        src={`./products/${props.product.img}`}
      />
      <span className="product-header">{props.product.name}</span>
      <div className="product-container">
        <MarketPrice product={props.product} id={cartId} />
      </div>
    </button>
  );
};