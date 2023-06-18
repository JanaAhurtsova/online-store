import { TProduct, TProductInfo } from '../../../../globalType';
import ProductInfo from '../../productInfo/productInfo';
import Count from './count';

export default class ShoppingProduct {
  public product: HTMLDivElement;

  public readonly productInfo: ProductInfo;

  private readonly count: Count;

  constructor() {
    this.product = document.createElement('div');
    this.count = new Count();
    this.productInfo = new ProductInfo();
    this.append();
  }

  private append() {
    this.productInfo.productView.append(this.count.countContainer);
    this.product.append(this.productInfo.productView);
  }

  public initShoppingProduct(data: TProduct, prodInfo: TProductInfo) {
    this.productInfo.initProductInfo(data);
    this.count.initCount(prodInfo, data);
  }
}
