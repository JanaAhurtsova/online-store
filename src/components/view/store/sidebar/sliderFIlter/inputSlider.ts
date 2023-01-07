import { TSLider, TSliderFilter } from '../../../../../globalType';
import FilterController from '../../../../controller/filterController';
import products from '../../../../data/products';

export default class InputSlider {
  public inputs: HTMLElement;

  public lower: HTMLInputElement;

  public upper: HTMLInputElement;

  public name: TSliderFilter;

  public maxValue: string;

  constructor(name: TSliderFilter) {
    this.name = name;
    this.inputs = document.createElement('div');
    this.maxValue = this.getRangeLength();
    this.lower = this.createInput('0', 'slider__lower');
    this.upper = this.createInput(this.maxValue, 'slider__upper');
    this.append();
    this.init();
  }

  public createInput(value: string, className: string) {
    const input = document.createElement('input');
    input.setAttribute('type', 'range');
    input.setAttribute('min', '0');
    input.setAttribute('max', this.maxValue);
    input.setAttribute('data-type', this.name);
    input.classList.add('slider__input');
    input.classList.add(className);
    return input;
  }

  private init() {
    this.inputs.classList.add('slider');
  }

  public filterRange(): TSLider {
    let upper = parseInt(this.upper.value, 10);
    let lower = parseInt(this.lower.value, 10);
    if (upper < lower) {
      const item = upper;
      upper = lower;
      lower = item;
    }
    return { upper, lower, name: this.name };
  }

  private append() {
    this.inputs.append(this.lower);
    this.inputs.append(this.upper);
  }

  public getRangeLength() {
    const product = [...products];
    FilterController.sortNumber(product, this.name);
    const result = new Set(product.map((item) => item[this.name]));
    return String(result.size - 1);
  }
}
