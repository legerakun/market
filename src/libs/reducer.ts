import { createContext } from "react";
import { State, Action, ContextProps } from "@/libs/types";

export const StateContext = createContext<ContextProps>({
  state: {},
  dispatch: () => {},
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type){
    case "INCREASE_CART_ITEM":
      if (action.item === undefined) return state;

      const increasedCart = { ...state.cart };

      increasedCart[action.item] = increasedCart[action.item] === action.stock
        ? action.stock
        : (increasedCart[action.item] += 1);

      return { 
        ...state, 
        cart: increasedCart 
      };
    
    case "DECREASE_CART_ITEM":
      if (action.item === undefined) return state;

      const decreasedCart = { ...state.cart };

      decreasedCart[action.item] = decreasedCart[action.item] === 1 
        ? 1 
        : (decreasedCart[action.item] -= 1);

      return { 
        ...state, 
        cart: decreasedCart 
      };
    
    case "ADD_TO_CART":
      if (action.item === undefined) return state;

      const addedCart = { ...state.cart };

      addedCart[action.item] = 1;

      return { 
        ...state, 
        cart: addedCart 
      };
    
    case "REMOVE_FROM_CART":
      if (action.item === undefined) return state;

      const removedCart = { ...state.cart };

      delete removedCart[action.item];

      return { 
        ...state, 
        cart: removedCart 
      };

    case "SET_PARAM":
      if (action.param === undefined) return state;
      if (action.option === undefined) return state;

      const setledParams = new URLSearchParams(state.params);

      setledParams.set(action.param, action.option);

      return { 
        ...state, 
        params: setledParams 
      };
  
    case "ADD_PARAM":
      if (action.param === undefined) return state;
      if (action.option === undefined) return state;

      const addedParams = new URLSearchParams(state.params);

      addedParams.has(action.param.toString())
        ? addedParams.set(
            action.param,
            addedParams.get(action.param) + "-" + action.option
          )
        : addedParams.set(action.param, action.option);

      return { 
        ...state, 
        params: addedParams 
      };
    
    case "REMOVE_PARAM":
      if (action.param === undefined) return state;
      if (action.option === undefined) return state;

      const removedParams = new URLSearchParams(state.params);
      const params = removedParams.get(action.param)!.split("-");

      if (params.length === 1) {
        removedParams.delete(action.param, action.option);
      } else {
        removedParams.set(
          action.param,
          params.toSpliced(params.indexOf(action.option), 1).join("-")
        );
      }

      return { 
        ...state, 
        params: removedParams 
      };
    
    case "CLEAR_PARAM":
      if (action.param === undefined) return state;

      const clearedParams = new URLSearchParams(state.params);

      clearedParams.delete(action.param);

      return { 
        ...state, 
        params: clearedParams 
      };
    
    case "CLEAR_PARAMS":
      return { 
        ...state, 
        params: new URLSearchParams() 
      };
    
    case "USE_CART":
      return { 
        ...state, 
        isOpen: !state.isOpen
       };
    
    case "INIT":
      return { 
        ...state, 
        cart: action.cart, 
        params: action.params
       };
    
    default:
      throw new Error("Unknown action.");
  }
};