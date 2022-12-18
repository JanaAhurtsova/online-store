import Article from './products/article';
import { TData, IArticleView } from '../../types/index';

export default class ArticleView implements IArticleView {
  renderArticles(data: TData[]) {
    const articlesContainer = document.createElement('div');
    articlesContainer.classList.add('wrapper__products');
    document.querySelector('.main')?.append(articlesContainer);

    data.forEach((article) => {
      const art = new Article(article);
      art.buildArticle();
    });
  }
}
