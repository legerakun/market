import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { StateContext } from "@/libs/reducer";
import { debounce } from "@/libs/utils";
import logo from "@/assets/logo.svg";

const Search = () => {
  const { state, dispatch } = useContext(StateContext);

  if (state.params === undefined) return;

  const { t } = useTranslation();
  const show = state.params.has("category");
  const transition = { ease: "easeInOut", duration: 0.3 };
  const initial = {
    width: "0",
    padding: "0"
  };

  const searchValue = state.params.has("search")
    ? state.params.get("search")
    : "";

  const onChange = debounce((value: string) => {
    if (state.params === undefined) return;

    if (value === "") {
      if (!state.params.has("search")) return;

      dispatch({
        type: "CLEAR_PARAM",
        param: "search"
      });
    } else {
      dispatch({
        type: "SET_PARAM",
        param: "search",
        option: value
      });
    }
  }, 500);

  return (
    <AnimatePresence>
      {show &&
        <motion.input
          initial={initial}
          animate={{
            width: "calc(100% - 30px)",
            padding: "10px",
            transition: transition
          }}
          exit={{
            ...initial,
            transition: transition
          }}
          id="search"
          type="search"
          className="search"
          defaultValue={searchValue!}
          placeholder={t("search")}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          key="search"
        />
      }
    </AnimatePresence>
  );
};

export const Navbar = () => {
  const { dispatch } = useContext(StateContext);

  return (
    <nav>
      <a
        className="navbar-market"
        onClick={() => dispatch({ type: "CLEAR_PARAMS" })}
      >
        <img src={logo} alt="logo" className="navbar-logo" />
        <span>React Market</span>
      </a>
      <Search />
    </nav>
  );
};