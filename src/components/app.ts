import Controller from './controller/controller';
import View from './view/view';

export default class App {
  view: View;

  controller: Controller;

  constructor() {
    this.view = new View();
    this.controller = new Controller();
  }

  start() {
    this.initListeners();
  }

  initListeners() {
    this.view.storePage.sideBar.filter.addEventListener('click', (event: Event) => this.controller.clickFilter(event));
    this.view.storePage.products.addEventListener('click', (event: Event, data = this.controller.clickProduct(event)) =>
      this.view.clickProduct(data)
    );
    this.view.productPage.buttonCart.addEventListener(
      'click',
      (event: Event, data = this.controller.clickProduct(event)) => this.view.clickProduct(data)
    );
    this.view.header.logo.addEventListener('click', this.controller.openStartPage.bind(this.controller));
    this.view.header.shoppingCart.addEventListener('click', this.controller.openShoppingCart.bind(this.controller));
    this.view.storePage.sorter.sorter.addEventListener('change', (event: Event) => this.controller.sort(event));
    this.view.storePage.sideBar.priceFilter.sliderInputs.lower.addEventListener('input', (event: Event) =>
      this.controller.sliderFilter(this.view.storePage.filterRange(event))
    );
    this.view.storePage.sideBar.priceFilter.sliderInputs.upper.addEventListener('input', (event: Event) =>
      this.controller.sliderFilter(this.view.storePage.filterRange(event))
    );
    this.view.storePage.sideBar.stockFilter.sliderInputs.lower.addEventListener('input', (event: Event) =>
      this.controller.sliderFilter(this.view.storePage.filterRange(event))
    );
    this.view.storePage.sideBar.stockFilter.sliderInputs.upper.addEventListener('input', (event: Event) =>
      this.controller.sliderFilter(this.view.storePage.filterRange(event))
    );
    this.view.storePage.search.input.addEventListener('input', (event: Event) => this.controller.search(event));
    this.view.storePage.sideBar.resetFilterButton.addEventListener(
      'click',
      this.controller.resetFilter.bind(this.controller)
    );
    window.addEventListener('popstate', (event: Event, data = this.controller.reloadPage()) =>
      this.view.reloadPage(data)
    );
    this.view.shoppingCartPage.productItems.addEventListener('click', (event: Event) => {
      this.controller.clickShoppingCartProduct(event);
    });
    this.view.reloadPage(this.controller.reloadPage());
  }
}
