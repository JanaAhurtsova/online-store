import Controller from './controller/controller';
import View from './view/view';
import ModalControllers from './controller/modalControllers';

export default class App {
  view: View;

  controller: Controller;

  modalControllers: ModalControllers;

  constructor() {
    this.view = new View();
    this.controller = new Controller();
    this.modalControllers = new ModalControllers();
  }

  start() {
    this.initListeners();
  }

  initListeners() {
    this.view.store.sideBar.filter.addEventListener('click', (event: Event) => this.controller.clickFilter(event));
    this.view.store.products.addEventListener('click', (event: Event, data = this.controller.clickProduct(event)) =>
      this.view.clickProduct(data)
    );
    this.view.productPage.buttonCart.addEventListener(
      'click',
      (event: Event, data = this.controller.clickProduct(event)) => this.view.clickProduct(data)
    );

    this.view.store.sorter.sorter.addEventListener('change', (event: Event) => this.controller.sort(event));
    this.view.store.sideBar.priceFilter.sliderInputs.lower.addEventListener('input', (event: Event) =>
      this.controller.sliderFilter(this.view.store.filterRange(event))
    );
    this.view.store.sideBar.priceFilter.sliderInputs.upper.addEventListener('input', (event: Event) =>
      this.controller.sliderFilter(this.view.store.filterRange(event))
    );
    this.view.store.sideBar.stockFilter.sliderInputs.lower.addEventListener('input', (event: Event) =>
      this.controller.sliderFilter(this.view.store.filterRange(event))
    );
    this.view.store.sideBar.stockFilter.sliderInputs.upper.addEventListener('input', (event: Event) =>
      this.controller.sliderFilter(this.view.store.filterRange(event))
    );
    this.view.store.search.input.addEventListener('input', (event: Event) => this.controller.search(event));
    this.view.store.sideBar.resetFilterButton.addEventListener(
      'click',
      this.controller.resetFilter.bind(this.controller)
    );
    // this.view.removeFilter.addEventListener('click', (event:Event) => this.controller.removeFilter(event))
    window.addEventListener('popstate', (event: Event, data = this.controller.reloadPage()) =>
      this.view.reloadPage(data)
    );
    this.view.reloadPage(this.controller.reloadPage());
    this.view.productPage.buttonBuy.addEventListener('click', this.view.openModal.bind(this.view));
    this.view.modal.overlay.addEventListener('click', this.modalControllers.closeModal);
    this.view.modal.creditCardNumber.addEventListener(
      'input',
      this.modalControllers.setPaymentSystem.bind(this.modalControllers)
    );
    this.view.modal.expiration.addEventListener(
      'input',
      this.modalControllers.expirationSlash.bind(this.modalControllers)
    );
    this.view.modal.cvv.addEventListener('input', this.modalControllers.enterCvv.bind(this.modalControllers));
    this.view.modal.modal.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.modalControllers.isValidForm();
    });
  }
}
