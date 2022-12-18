import Article from './article';
import products from './data';
import { TData } from '../../types/index';

function renderArticles(data: TData[]) {
  const articlesContainer = document.createElement('div');
  articlesContainer.classList.add('wrapper__products');
  document.querySelector('.main')?.append(articlesContainer);

  data.forEach((article) => {
    const art = new Article(article);
    art.buildArticle();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  if (products) {
    renderArticles(products);
  }
});
