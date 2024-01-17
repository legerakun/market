export type Products = Record<string, Record<string, Product>>;
export type Categories = Record<string, string[]>;
export type Tags = Record<string, Record<string, string>>;
export type Cart = Record<string, number>;
export type Styles = Record<string, Record<string, number | string>>;

export interface ContextProps {
  state: State;
  dispatch: Function;
}

export interface State {
  cart?: Cart;
  params?: URLSearchParams;
  isOpen?: boolean;
}

export interface Action {
  type: string;
  item?: string;
  cart?: Cart;
  params?: URLSearchParams;
  stock?: number;
  option?: string;
  param?: string;
}

export interface Product {
  name: string;
  tags: string[];
  img: string;
  discount: number;
  price: number;
  stock: number;
}