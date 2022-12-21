export type TProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  type: string;
  category: string;
  urlImg: string;
  images: string[];
};

export type TShopingCart = {
  price: number;
  products: number[];
};

export type TQuery = {
  type: string;
  name: string[];
};

export type TReloadPage = {
  products: TProduct[];
  query: TQuery[];
};

export type TSorter = {
  text: string;
  value: string;
};

export type TFilter = 'category' | 'type';
