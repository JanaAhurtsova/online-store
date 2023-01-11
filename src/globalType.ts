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

export type TShoppingCart = {
  price: number;
  info: TProductInfo[];
};

export type TProductInfo = {
  count: number;
  product: number;
};

export type TQuery = {
  type: string;
  name: string[];
};

export interface TReloadPage {
  products: TProduct[];
  query: TQuery[];
}

export type TSorter = {
  text: string;
  value: string;
};

export type TSlider = {
  name: TSliderFilter;
  upper: number;
  lower: number;
};

export type TSliderFilter = 'price' | 'stock';

export type TFilter = 'category' | 'type';

export interface IView {
  getLocalStorageDate(): TShoppingCart;
  reloadPage(data: TReloadPage | string): void;
  openShoppingCartPage(localStorage: TShoppingCart, data: TReloadPage): void;
  openProductPage(data: string, localStorage: TShoppingCart): void;
  openShopPage(data: TReloadPage, localStorage: TShoppingCart): void;
  openModal(): void;
}

export interface IModalController {
  closeModal(event: Event): void;
  setPaymentSystem(event: Event, el: HTMLElement): void;
  expirationSlash(event: Event): void;
  enterCvv(event: Event): void;
  ordering(modal: HTMLFormElement, input: HTMLInputElement, cb: () => void): void;
}

export interface IStore {
  createProducts(shoppingCart: TShoppingCart, typeView: string, data: TProduct[]): void;
  shopCartInfo(data: TShoppingCart): void;
  filterRange(event: Event): TSlider;
}
