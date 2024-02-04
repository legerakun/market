import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StateContext } from "@/libs/reducer";
import { CartPanel } from "@/components/cart/CartPanel";
import { CartClose } from "@/components/cart/CartClose";
import cart from "@/assets/cart.svg";

export const Cart = () => {
  const { state, dispatch } = useContext(StateContext);
  const transition = { ease: "easeInOut", duration: 0.3 };
  const width = window.innerWidth > 500
    ? "500px"
    : "100%"; 
  const x = window.innerWidth > 500 
    ? "calc(100% - 500px)"
    : "0";

  return (
    <>  
      <CartClose img={cart} />
      <AnimatePresence>
        {state.isOpen && 
          <>
            <motion.div
              initial={{ opacity: 0}}
              animate={{
                opacity: 1,
                transition: transition,
              }}
              exit={{ 
                opacity: 0,
                transition: transition
              }}
              className="cart-close"
              onClick={() => dispatch({ type: "USE_CART" })}
              key="cart-close"
            />
            <motion.div 
              initial={{ 
                x: "100%",
                width: width
              }}
              animate={{
                x: x,
                transition: transition
              }}
              exit={{ 
                x: "100%", 
                transition: transition 
              }}
              className="cart-container"
              key="cart-container"
            >
              <CartPanel />
            </motion.div>
          </>
        }
      </AnimatePresence>
    </>
  );
};