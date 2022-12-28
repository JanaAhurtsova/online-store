import { TProduct, TProductInfo } from '../../../../globalType';
import ProductInfo from '../../productInfo/productInfo';
import Count from './count';

export default class ShoppingProduct {
  product: HTMLDivElement;

  productInfo: ProductInfo;

  count: Count;

  constructor() {
    this.product = document.createElement('div');
    this.count = new Count();
    this.productInfo = new ProductInfo();
    this.append();
  }

  append() {
    this.productInfo.productView.append(this.count.countContainer);
    this.product.append(this.productInfo.productView);
  }

  initShoppingProduct(data: TProduct, prodInfo: TProductInfo) {
    this.productInfo.initProductInfo(data);
    this.count.initCount(prodInfo, data);
  }
}
