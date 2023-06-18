import { TReloadPage, TSlider, TSliderFilter } from '../../../../../globalType';
import Controller from '../../../../controller/controller';
import products from '../../../../data/products';
import InputSlider from './inputSlider';

export default class SliderFilter {
  private range: HTMLDivElement;

  private rangeTitle: HTMLSpanElement;

  public slider: HTMLDivElement;

  public sliderInputs: InputSlider;

  public rangeMinText: HTMLSpanElement;

  public rangeMaxText: HTMLSpanElement;

  private rangeContainer: HTMLDivElement;

  constructor(text: TSliderFilter) {
    this.slider = document.createElement('div');
    this.range = document.createElement('div');
    this.rangeTitle = document.createElement('h2');
    this.rangeContainer = document.createElement('div');
    this.rangeMinText = document.createElement('span');
    this.rangeMaxText = document.createElement('span');
    this.sliderInputs = new InputSlider(text);
    this.init(text);
    this.append();
  }

  private init(text: string) {
    this.rangeTitle.className = 'range__title';
    this.rangeTitle.textContent = text;
    this.rangeContainer.classList.add('range__container');
  }

  private append() {
    this.rangeContainer.append(this.rangeMinText);
    this.rangeContainer.append(this.rangeMaxText);
    this.range.append(this.rangeTitle);
    this.range.append(this.rangeContainer);
    this.range.append(this.sliderInputs.inputs);
    this.slider.append(this.range);
  }

  public filterRange(): TSlider {
    return this.sliderInputs.filterRange();
  }

  public reloadPage(info: TReloadPage) {
    const infoProduct = Controller.getSetTypes(this.sliderInputs.filterRange(), info.products);
    if (infoProduct.length === 0) {
      this.sliderInputs.lower.value = '0';
      this.sliderInputs.upper.value = this.sliderInputs.getRangeLength();
      this.rangeMinText.innerHTML = `not found`;
      this.rangeMaxText.innerHTML = ``;
      return;
    }
    this.reloadSliderValue(infoProduct[0], infoProduct[infoProduct.length - 1]);
  }

  public reloadSliderValue(minValue: string, maxValue: string) {
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
