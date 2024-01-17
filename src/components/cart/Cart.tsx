import { useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { StateContext } from "@/libs/reducer";
import { CartPanel } from "@/components/cart/CartPanel";
import { CartClose } from "@/components/cart/CartClose";
import cart from "@/assets/cart.svg";

export const Cart = () => {
  const { state, dispatch } = useContext(StateContext);
  const cartCloseNode = useRef(null);
  const cartPanelNode = useRef(null);

  return (
    <>
      <CartClose img={cart} />
      <CSSTransition
        nodeRef={cartCloseNode}
        in={state.isOpen}
        timeout={300}
        classNames="cart-close"
        unmountOnExit
      >
        <div
          ref={cartCloseNode}
          className="cart-close"
          onClick={() => dispatch({ type: "USE_CART" })}
        />
      </CSSTransition>
      <CSSTransition
        nodeRef={cartPanelNode}
        in={state.isOpen}
        timeout={300}
        classNames="cart-container"
        unmountOnExit
      >
        <CartPanel nodeRef={cartPanelNode} />
      </CSSTransition>
    </>
  );
};