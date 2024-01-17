import { useContext, useRef, MutableRefObject } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { FilterPrice } from "@/components/market/FilterPrice";
import { StateContext } from "@/libs/reducer";
import { Categories, Tags } from "@/libs/types";
import categoriesData from "@/data/categories.json";
import tagsData from "@/data/tags.json";

const categories: Categories = categoriesData;
const tags: Tags = tagsData;

interface OptionProps {
  option: string;
  nodeRef: MutableRefObject<null>;
}

const Option = ({ option, nodeRef }: OptionProps) => {
  const { state, dispatch } = useContext(StateContext);

  if (state.params === undefined) return;

  const { t } = useTranslation();

  const params = state.params.get("filters") !== null
    ? state.params.get("filters")!.split("-")
    : [];

  const action = params.includes(option)
    ? () => dispatch({ type: "REMOVE_PARAM", param: "filters", option: option })
    : () => dispatch({ type: "ADD_PARAM", param: "filters", option: option });

  return (
    <section className="filter" ref={nodeRef}>
      <input
        type="checkbox"
        className="checkbox"
        id={option}
        onClick={action}
        checked={params.includes(option) ? true : false}
        readOnly
      />
      <label htmlFor={option} className="filter-label">
        {t(`tags.${option}`)}
      </label>
    </section>
  );
};

interface CategoryProps {
  category: string;
  img: string;
  nodeRef: MutableRefObject<null>;
  active?: boolean;
}

const Category = (props: CategoryProps) => {
  const { dispatch } = useContext(StateContext);
  const { t } = useTranslation();

  return (
    <div
      className="category"
      onClick={() =>
        props.active &&
        dispatch({
          type: "ADD_PARAM",
          param: "category",
          option: props.category,
        })
      }
      style={props.active ? {} : { cursor: "default" }}
      ref={props.nodeRef}
    >
      <img
        className="category-img"
        alt={props.category}
        src={`./categories/${props.img}`}
      />
      <span className="category-name">
        {t(`categories.${props.category}`)}
      </span>
      <img
        className="category-noise"
        alt={props.category}
        src={"./categories/noise.png"}
      />
    </div>
  );
};

export const Filter = () => {
  const { state } = useContext(StateContext);

  if (state.params === undefined) return;

  const { t } = useTranslation();

  const options = Object.entries(tags).reduce((acc, tag) => {
    if (state.params === undefined) return acc;

    const [tagCategory, tagItems] = tag;

    const hasCategory =
      state.params.get("category") === categories[tagCategory][0];

    const categoryRef = useRef(null);

    acc.push(
      <CSSTransition
        nodeRef={categoryRef}
        in={state.params.size === 0 || hasCategory}
        timeout={500}
        classNames="category"
        key={categories[tagCategory][0]}
        mountOnEnter
      >
        <Category
          category={categories[tagCategory][0]}
          img={categories[tagCategory][1]}
          active={state.params.size === 0 && true}
          nodeRef={categoryRef}
        />
      </CSSTransition>
    );

    const priceRef = useRef(null);

    acc.push(
      <CSSTransition
        nodeRef={priceRef}
        in={state.params.get("category") === categories[tagCategory][0]}
        timeout={500}
        classNames="filter-price"
        unmountOnExit
        key={"filter-price" + tagCategory}
      >
        <FilterPrice category={tagCategory} nodeRef={priceRef} />
      </CSSTransition>
    );

    if (Object.entries(tagItems).length !== 0) {
      const labelRef = useRef(null);

      acc.push(
        <CSSTransition
          nodeRef={labelRef}
          in={state.params.get("category") === categories[tagCategory][0]}
          timeout={500}
          classNames="filter-price"
          unmountOnExit
          key={"filter-tag" + tagCategory}
        >
          <section
            className="filter-price"
            style={{ height: "20px" }}
            ref={labelRef}
          >
            {t("tag")}
          </section>
        </CSSTransition>
      );
    }

    Object.entries(tagItems).map((item) => {
      if (state.params === undefined) return;

      const [itemId, itemData] = item;
      const optionRef = useRef(null);

      acc.push(
        <CSSTransition
          nodeRef={optionRef}
          in={state.params.get("category") === categories[tagCategory][0]}
          timeout={500}
          classNames="filter"
          unmountOnExit
          key={itemId + itemData}
        >
          <Option option={itemData} nodeRef={optionRef} />
        </CSSTransition>
      );
    });

    return acc;
  }, [] as JSX.Element[]);

  return <div className="filters">{options}</div>;
};