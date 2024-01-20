import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { StateContext, reducer } from "@/libs/reducer";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Market } from "@/components/market/Market";
import { Cart } from "@/components/cart/Cart";

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, dispatch] = useReducer(reducer, {
    cart: {},
    params: new URLSearchParams(),
    isOpen: false,
  });

  useEffect(() => {
    const cart = localStorage.getItem("cart");

    if (cart === null) return;

    dispatch({
      type: "INIT",
      cart: JSON.parse(cart),
      params: searchParams,
    });
  }, []);

  useEffect(() => {
    if (state.params === undefined) return;

    if (searchParams.toString() === state.params.toString()) return;

    state.params = new URLSearchParams(searchParams);

    setSearchParams(state.params);
  }, [searchParams]);

  useEffect(() => {
    if (state.params === undefined) return;

    setSearchParams(state.params);
  }, [state.params]);

  useEffect(() => {
    if (state.cart === undefined) return;

    if (Object.keys(state.cart).length === 0) return;

    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Preloader />
      <Footer />
      <StateContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Market />
        <Cart />
      </StateContext.Provider>
    </>
  );
};