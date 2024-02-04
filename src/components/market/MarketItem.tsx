import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MarketPrice } from "@/components/market/MarketPrice";
import { StateContext } from "@/libs/reducer";
import { Product } from "@/libs/types";

interface MarketItemProps {
  product: Product;
  category: string;
  id: number;
  show: boolean;
}

export const MarketItem = (props: MarketItemProps) => {
  const { state, dispatch } = useContext(StateContext);

  if (state.cart === undefined) return;

  const cartId = props.category + "_" + props.id;
  const initial = { opacity: 0 };

  const action = cartId in state.cart
    ? () => dispatch({ type: "REMOVE_FROM_CART", item: cartId })
    : () => dispatch({ type: "ADD_TO_CART", item: cartId });

  return (
    <AnimatePresence>
      {props.show &&
        <motion.button
          initial={initial}
          animate={{
            opacity: 1,
            transition: { ease: "easeInOut", duration: props.id*0.1 }
          }}
          exit={initial}
          className="product"
          onClick={action}
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
        </motion.button>
      }
    </AnimatePresence>
  );
};