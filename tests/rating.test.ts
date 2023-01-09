import { describe, expect, test } from '@jest/globals';
import Rating from '../src/components/view/productInfo/rating';

describe('rating module', () => {
  const rating = new Rating();
  const data = {
    id: 1,
    title: 'backsaelen',
    description:
      'This armchair is easy on the eyes and body. The design is welcoming with the deep seat and the high back and armrests that embrace you. It is also super easy to remove the cover and wash it.',
    price: 449.0,
    rating: 4.5,
    stock: 94,
    type: 'armchairs',
    category: 'living_room',
    urlImg:
      'https://firebasestorage.googleapis.com/v0/b/online-shop-8c752.appspot.com/o/shop%2Fliving-room%2Farmchairs%2Fbacksaelen%2F1.avif?alt=media&token=d47a11da-9ac1-4b1e-ad47-0d6c2d2c6954',
    images: [
      'https://firebasestorage.googleapis.com/v0/b/online-shop-8c752.appspot.com/o/shop%2Fliving-room%2Farmchairs%2Fbacksaelen%2F1.avif?alt=media&token=d47a11da-9ac1-4b1e-ad47-0d6c2d2c6954',
      'https://firebasestorage.googleapis.com/v0/b/online-shop-8c752.appspot.com/o/shop%2Fliving-room%2Farmchairs%2Fbacksaelen%2F2.avif?alt=media&token=d5436232-aaac-4837-9fd2-d64f1db64067',
      'https://firebasestorage.googleapis.com/v0/b/online-shop-8c752.appspot.com/o/shop%2Fliving-room%2Farmchairs%2Fbacksaelen%2F3.avif?alt=media&token=575a32d1-8e60-4320-a06b-6f42b9db4d44',
    ],
  };

  test('should add class inactive to switcherLeftArrow', () => {
    rating.initRating(data);
    expect(rating.ratingBack.style.width).toBe('90%');
    expect(rating.ratingText.textContent).toBe('Rating 4.5/5');
  });
});
