export type TData = {
  id: number;
  title: string;
  description?: string;
  price: number;
  rating: number;
  stock?: number;
  type?: string;
  category?: string;
  urlImg: string;
  images?: string[];
};

export interface IArticle {
  buildArticle(): void;
  appendArticleElements(): void;
}
