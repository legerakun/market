import { useContext, MutableRefObject } from "react";
import { useTranslation } from "react-i18next";
import { StateContext } from "@/libs/reducer";
import { Products } from "@/libs/types";
import { debounce } from "@/libs/utils";
import productsData from "@/data/products.json";

const products: Products = productsData;

interface InputProps {
  min: number;
  max: number;
  type: string;
  defaultValue: number;
}

const Input = ({ min, max, type, defaultValue }: InputProps) => {
  const { dispatch } = useContext(StateContext);

  const onChange = debounce((value: number, type: string) => {
    const initValue = type === "min" ? min : max;

    if (value === initValue) {
      dispatch({
        type: "CLEAR_PARAM",
        param: "price" + type
      });
    } else {
      dispatch({
        type: "SET_PARAM",
        param: "price" + type,
        option: value
      });
    }
  }, 500);

  return (
    <input
      min={min}
      max={max}
      defaultValue={defaultValue}
      id={"price-" + type}
      type="range"
      className="price"
      onChange={(e) => onChange(Math.round(Number(e.target.value)), type)}
    />
  );
};

interface FilterPrice {
  category: string;
  nodeRef: MutableRefObject<null>;
}

export const FilterPrice = ({ category, nodeRef }: FilterPrice) => {
  const { state } = useContext(StateContext);

  if (state.params === undefined) return;

  const { t } = useTranslation();

  const prices = Object.values(products[category]).map((product) => {
    return product.discount === 0
      ? product.price
      : product.price * ((100 - product.discount) / 100);
  });

  const min = Math.round(Math.min(...prices));
  const max = Math.round(Math.max(...prices));

  const defaultMin = state.params.has("pricemin")
    ? state.params.get("pricemin")
    : min;

  const defaultMax = state.params.has("pricemax")
    ? state.params.get("pricemax")
    : max;

  return (
    <section className="filter-price" ref={nodeRef}>
      <span className="filter-label-2">{t("price")}</span>
      <section className="filter-section">
        <label className="filter-label-2" htmlFor="price-min">
          {"$" + (min / 100).toFixed(2)}
        </label>
        <label className="filter-label-2" htmlFor="price-max">
          {"$" + (max / 100).toFixed(2)}
        </label>
      </section>
      <Input
        type="min"
        min={min}
        max={(max - min) * 0.5 + min}
        defaultValue={Number(defaultMin)}
      />
      <Input
        type="max"
        min={(max - min) * 0.5 + min}
        max={max}
        defaultValue={Number(defaultMax)}
      />
    </section>
  );
};