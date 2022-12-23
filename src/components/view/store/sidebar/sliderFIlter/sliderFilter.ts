import { TQuery, TReloadPage, TSLider, TSliderFilter } from '../../../../../globalType';
import Controller from '../../../../controller/controller';
import products from '../../../../data/products';
import InputSlider from './inputSlider';

export default class SliderFilter {
  title: HTMLHeadingElement;

  range: HTMLDivElement;

  rangeText: HTMLSpanElement;

  slider: HTMLDivElement;

  sliderInputs: InputSlider;

  rangeMinText: HTMLSpanElement;

  rangeMaxText: HTMLSpanElement;

  rangeContainer: HTMLDivElement;

  constructor(text: TSliderFilter) {
    this.slider = document.createElement('div');
    this.title = document.createElement('h2');
    this.range = document.createElement('div');
    this.rangeText = document.createElement('span');
    this.rangeContainer = document.createElement('div');
    this.rangeMinText = document.createElement('span');
    this.rangeMaxText = document.createElement('span');
    this.sliderInputs = new InputSlider(text);
    this.init(text);
    this.append();
  }

  init(text: string) {
    this.title.innerHTML = `Filter by ${text}`;
    this.rangeText.innerHTML = `${text}: `;
    this.rangeContainer.classList.add('range__container');
  }

  append() {
    this.slider.append(this.title);
    this.rangeContainer.append(this.rangeMinText);
    this.rangeContainer.append(this.rangeMaxText);
    this.range.append(this.rangeText);
    this.range.append(this.rangeContainer);
    this.range.append(this.sliderInputs.inputs);
    this.slider.append(this.range);
  }

  filterRange(): TSLider {
    return this.sliderInputs.filterRange();
  }

  reloadPage(info: TReloadPage) {
    const data = info.query.find((item) => item.type === this.sliderInputs.name) as TQuery;
    const infoProduct = Controller.getSetTypes(this.sliderInputs.filterRange(), info.products);
    if (infoProduct.length === 0) {
      console.log(infoProduct.length);
      this.sliderInputs.lower.value = '0';
      this.sliderInputs.upper.value = this.sliderInputs.getRangeLength();
      this.rangeMinText.innerHTML = `not found`;
      this.rangeMaxText.innerHTML = ``;
      return;
    }
    if (data) {
      this.title.classList.add('selected-filter');
    } else {
      this.title.classList.remove('selected-filter');
    }
    const minValue = +infoProduct[0];
    const maxValue = +infoProduct[infoProduct.length - 1];
    this.reloadSliderValue(minValue, maxValue);
  }

  reloadSliderValue(minValue: number, maxValue: number) {
    const product = Controller.getSetTypes(this.sliderInputs.filterRange(), products);
    this.sliderInputs.lower.value = `${product.indexOf(minValue)}`;
    this.sliderInputs.upper.value = `${product.indexOf(maxValue)}`;
    if (this.sliderInputs.name === 'price') {
      this.rangeMinText.innerHTML = `$${minValue}`;
      this.rangeMaxText.innerHTML = `$${maxValue}`;
    } else {
      this.rangeMinText.innerHTML = `${minValue}`;
      this.rangeMaxText.innerHTML = `${maxValue}`;
    }
  }
}
