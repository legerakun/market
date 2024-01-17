import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { StateContext } from "@/libs/reducer";
import { debounce } from "@/libs/utils";
import logo from "@/assets/logo.svg";

const Search = () => {
  const { state, dispatch } = useContext(StateContext);

  if (state.params === undefined) return;

  const { t } = useTranslation();
  const searchRef = useRef(null);

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
    <CSSTransition
      nodeRef={searchRef}
      in={state.params.has("category")}
      timeout={300}
      classNames="search"
      mountOnEnter
    >
      <input
        ref={searchRef}
        id="search"
        type="search"
        className="search"
        defaultValue={searchValue!}
        placeholder={t("search")}
        onChange={(e) => onChange(e.target.value.toLowerCase())}
      />
    </CSSTransition>
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