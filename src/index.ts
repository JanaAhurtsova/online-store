import './scss/global.scss';
import ArticleView from './components/storage/articlesView';
import products from './components/storage/products/data';

const art = new ArticleView();
art.renderArticles(products);
