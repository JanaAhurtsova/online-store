import { describe, expect, test } from '@jest/globals';
import ProductPage from '../src/components/view/productPage/productPage';
import { TProduct, TShoppingCart } from '../src/globalType';

describe('product page module', () => {
  let productPage: ProductPage;
  let product: TProduct;
  let shoppingCart: TShoppingCart;

  beforeEach(() => {
    productPage = new ProductPage();
    product = {
      id: 5,
      title: 'strandmond',
      description:
        'STRANDMON has a timeless look with modern comfort for many cozy moments. The wing chair offers a soft embracing feel and the footstool is nice to rest your feet on – or use as extra seating for guests.',
      price: 449.0,
      rating: 4.5,
      stock: 34,
      type: 'armchairs',
      category: 'living_room',
      urlImg:
        'https://firebasestorage.googleapis.com/v0/b/online-shop-8c752.appspot.com/o/shop%2Fliving-room%2Farmchairs%2Fstrandmond%2F1.avif?alt=media&token=a66efaff-5765-412a-9d41-0de95d905201',
      images: [
        'https://firebasestorage.googleapis.com/v0/b/online-shop-8c752.appspot.com/o/shop%2Fliving-room%2Farmchairs%2Fstrandmond%2F1.avif?alt=media&token=a66efaff-5765-412a-9d41-0de95d905201',
        'https://firebasestorage.googleapis.com/v0/b/online-shop-8c752.appspot.com/o/shop%2Fliving-room%2Farmchairs%2Fstrandmond%2F2.avif?alt=media&token=751e2969-8636-4409-b5b9-ff88fe02fb95',
        'https://firebasestorage.googleapis.com/v0/b/online-shop-8c752.appspot.com/o/shop%2Fliving-room%2Farmchairs%2Fstrandmond%2F3.avif?alt=media&token=e93656a3-4f60-4ae5-9b00-8c546b4cf013',
      ],
    };
    shoppingCart = {
      price: 449.0,
      info: [
        {
          count: 1,
          product: 5,
        },
      ],
    };
    productPage.openPage(product, shoppingCart);
  });

  test('should be instance of Product Page', () => {
    expect(productPage).toBeInstanceOf(ProductPage);
  });

  test('ensure constructor created the object', () => {
    expect(productPage).toBeTruthy();
  });

  test('the data of product page should be equal to product', () => {
    expect(productPage.id).toEqual(product.id);
    expect(productPage.productInfo.price.textContent).toBe(`$${product.price}`);
    expect(productPage.productStock.textContent).toBe(`Stock: ${product.stock}`);
  });

  test('check product in cart', () => {
    productPage.shopCartInfo(shoppingCart);
    expect(productPage.buttonCart.textContent).toBe('drop from cart');
  });
});
