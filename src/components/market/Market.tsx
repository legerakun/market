import { useContext, useRef } from "react";
import { Transition } from "react-transition-group";
import { StateContext } from "@/libs/reducer";
import { MarketItem } from "@/components/market/MarketItem";
import { Filter } from "@/components/market/Filter";
import { Categories, Products, Tags } from "@/libs/types";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import tagsData from "@/data/tags.json";
import landing from "@/assets/logo.svg";

const categories: Categories = categoriesData;
const products: Products = productsData;
const tags: Tags = tagsData;

export const Market = () => {
  const { state } = useContext(StateContext);

  const sortedProducts = Object.entries(products).reduce((acc, product) => {
    const [productCategory, productItems] = product;

    Object.entries(productItems).map((item) => {
      if (state.params === undefined) return;

      const [itemId, itemData] = item;

      const category = categories[productCategory][0];
      const hasCategory = state.params.get("category") === category;

      const goodTags = () => {
        if (state.params === undefined) return;

        if (state.params.get("filters") === null) {
          return true;
        } else {
          return Object.entries(tags[productCategory]).some((tag) => {
            if (state.params === undefined) return;

            const [tagId, tagName] = tag;

            const params = state.params.get("filters") !== null
              ? state.params.get("filters")!.split("-")
              : [];

            return itemData.tags.includes(tagId) && params.includes(tagName);
          });
        }
      };

      const goodSearch = () => {
        if (state.params === undefined) return;

        if (state.params.has("search")) {
          const name = itemData.name.toLowerCase();
          return name.search(state.params.get("search")!) === -1 ? false : true;
        } else {
          return true;
        }
      };

      const min = state.params.get("pricemin");
      const max = state.params.get("pricemax");

      const goodPrice =
        (min === null ? true : itemData.price >= Number(min)) &&
        (max === null ? true : itemData.price <= Number(max));

      const marketRef = useRef(null);

      acc.push(
        <Transition
          nodeRef={marketRef}
          in={hasCategory && goodPrice && goodTags() && goodSearch()}
          timeout={300}
          key={itemData.name}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <MarketItem
              product={itemData}
              category={productCategory}
              id={Number(itemId)}
              stage={state}
              nodeRef={marketRef}
            />
          )}
        </Transition>
      );
    });

    return acc;
  }, [] as JSX.Element[]);

  return (
    <>
      <Filter />
      <div className="market">
        <img src={landing} alt="market" className="landing" />
        {sortedProducts}
      </div>
    </>
  );
};