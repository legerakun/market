import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FilterPrice } from "@/components/market/FilterPrice";
import { StateContext } from "@/libs/reducer";
import { Categories, Tags } from "@/libs/types";
import categoriesData from "@/data/categories.json";
import tagsData from "@/data/tags.json";

const categories: Categories = categoriesData;
const tags: Tags = tagsData;

interface OptionProps {
  option: string;
  show: boolean;
}

const Option = ({ option, show }: OptionProps) => {
  const { state, dispatch } = useContext(StateContext);

  if (state.params === undefined) return;

  const { t } = useTranslation();
  const transition = { ease: "easeInOut", duration: 0.5 };
  const initial = { height: "0", fontSize: "0" };

  const params = state.params.get("filters") !== null
    ? state.params.get("filters")!.split("-")
    : [];

  const action = params.includes(option)
    ? () => dispatch({ type: "REMOVE_PARAM", param: "filters", option: option })
    : () => dispatch({ type: "ADD_PARAM", param: "filters", option: option });

  return (
    <AnimatePresence>
      {show &&
        <motion.section 
          initial={initial}
          animate={{
            height: "30px",
            fontSize: "1rem",
            transition: transition
          }}
          exit={{
            ...initial,
            transition: transition
          }}
          className="filter"
        >
          <input
            type="checkbox"
            className="checkbox"
            id={option}
            onChange={action}
            checked={params.includes(option) ? true : false}
          />
          <label htmlFor={option} className="filter-label">
            {t(`tags.${option}`)}
          </label>
        </motion.section>
      }
    </AnimatePresence>
  );
};

interface CategoryProps {
  category: string;
  img: string;
  show: boolean;
  active?: boolean;
}

const Category = (props: CategoryProps) => {
  const { dispatch } = useContext(StateContext);
  const { t } = useTranslation();
  const transition = { ease: "easeInOut", duration: 0.5 };
  const initial = { minHeight: "0", x: "-300px" };
  const minHeight = window.innerWidth > 500 
    ? "120px" 
    : "70px";

  return (
    <AnimatePresence>
      {props.show &&
        <motion.div
          initial={initial}
          animate={{
            minHeight: minHeight,
            x: "0",
            transition: transition
          }}
          exit={{
            ...initial, 
            transition: transition
          }}
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
        </motion.div>
      }
    </AnimatePresence>
  );
};

export const Filter = () => {
  const { state } = useContext(StateContext);

  if (state.params === undefined) return;

  const options = Object.entries(tags).reduce((acc, tag) => {
    if (state.params === undefined) return acc;

    const [tagCategory, tagItems] = tag;

    const hasCategory =
      state.params.get("category") === categories[tagCategory][0];

    acc.push(
      <Category
        category={categories[tagCategory][0]}
        img={categories[tagCategory][1]}
        active={state.params.size === 0 && true}
        show={state.params.size === 0 || hasCategory}
        key={categories[tagCategory][0]}
      />
    );

    const show = state.params.get("category") === categories[tagCategory][0];

    acc.push(
      <FilterPrice 
        category={tagCategory} 
        show={show} 
        key={"filter-price" + tagCategory}
      />
    );

    Object.entries(tagItems).map((item) => {
      if (state.params === undefined) return;

      const [itemId, itemData] = item;

      acc.push(
        <Option 
          option={itemData} 
          show={show} 
          key={itemId + itemData} 
        />
      );
    });

    return acc;
  }, [] as JSX.Element[]);

  return <div className="filters">{options}</div>;
};