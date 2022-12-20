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
  name: string;
};

export type TFilter = 'category' | 'type';
