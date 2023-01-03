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
    this.view.shoppingCartPage.productsPage.numberPagesInput.addEventListener('input', (event: Event) => {
      this.controller.shoppingInputPage(event);
    });
    this.view.shoppingCartPage.productsPage.switcher.addEventListener('click', (event: Event) => {
      this.controller.changeShoppingPage(event);
    });
    this.view.reloadPage(this.controller.reloadPage());
    this.view.shoppingCartPage.summary.buyButton.addEventListener('click', () =>
      this.controller.openModalWindow(this.view.openModal.bind(this.view))
    );
    this.view.productPage.buttonBuy.addEventListener('click', () =>
      this.controller.openModalWindow(this.view.openModal.bind(this.view))
    );
    this.view.storePage.view.viewGrid.addEventListener('click', this.controller.clickGridView.bind(this.controller));
    this.view.storePage.view.viewLine.addEventListener('click', this.controller.clickLineView.bind(this.controller));
    this.view.modal.overlay.addEventListener('click', this.modalControllers.closeModal);
    this.view.modal.creditCard.creditCardNumber.addEventListener(
      'input',
      (event: Event, el = this.view.modal.creditCard.paymentSystem) => {
        this.modalControllers.setPaymentSystem(event, el);
      }
    );
    this.view.modal.creditCard.expiration.addEventListener('input', (event: Event) => {
      this.modalControllers.expirationSlash(event);
    });
    this.view.modal.creditCard.cvv.addEventListener('input', (event: Event) => {
      this.modalControllers.enterCvv(event);
    });
    this.view.modal.modal.addEventListener(
      'submit',
      (event: Event, el = this.view.modal.creditCard.expiration): void => {
        event.preventDefault();
        this.modalControllers.isValidForm(el);
      }
    );
  }
}
