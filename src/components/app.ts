import Controller from './controller/controller';
import View from './view/view';
import ModalControllers from './controller/modalControllers';

export default class App {
  private view: View;

  private controller: Controller;

  private modalControllers: ModalControllers;

  constructor() {
    this.view = new View();
    this.controller = new Controller();
    this.modalControllers = new ModalControllers();
  }

  public start() {
    this.initListeners();
    this.view.reloadPage(this.controller.reloadPage());
  }

  initListeners() {
    this.initHeaderListeners();
    this.initModalListeners();
    this.initProductPageListeners();
    this.initShoppingCartPageListener();
    this.initStorePageListeners();
    this.initRouterListener();
  }

  private initStorePageListeners() {
    this.view.storePage.sideBar.filter.addEventListener('click', (event: Event) => this.controller.clickFilter(event));
    this.view.storePage.products.addEventListener('click', (event: Event) => this.controller.clickProductList(event));
    this.view.storePage.sorter.sorter.addEventListener('change', (event: Event) => this.controller.sort(event));
    this.view.storePage.sideBar.sidebar.addEventListener('input', (event: Event) =>
      this.controller.sliderFilter(this.view.storePage.filterRange(event))
    );
    this.view.storePage.search.input.addEventListener('input', (event: Event) => this.controller.search(event));

    this.view.storePage.sideBar.resetFilterButton.addEventListener(
      'click',
      this.controller.resetFilter.bind(this.controller)
    );
    this.view.storePage.view.view.addEventListener('click', this.controller.clickViewHandler.bind(this.controller));
  }

  private initProductPageListeners() {
    this.view.productPage.buttonCart.addEventListener('click', (event: Event) =>
      this.controller.clickProductList(event)
    );
    this.view.productPage.images.addEventListener('click', (event: Event) => {
      this.controller.changeImages(event, this.view.productPage.mainImage);
    });
    this.view.productPage.buttonBuy.addEventListener('click', (event: Event) =>
      this.controller.openModalWindow(event, this.view.openModal.bind(this.view))
    );
  }

  private initHeaderListeners() {
    this.view.header.logo.addEventListener('click', this.controller.openStartPage.bind(this.controller));
    this.view.header.shoppingCart.addEventListener('click', this.controller.openShoppingCart.bind(this.controller));
  }

  private initShoppingCartPageListener() {
    this.view.shoppingCartPage.productItems.addEventListener('click', (event: Event) => {
      this.controller.clickShoppingCartProduct(event);
    });
    this.view.shoppingCartPage.productsPage.numberPagesInput.addEventListener('input', (event: Event) => {
      this.controller.shoppingInputPage(event);
    });
    this.view.shoppingCartPage.productsPage.switcher.addEventListener('click', (event: Event) => {
      this.controller.changeShoppingPage(event);
    });
    this.view.shoppingCartPage.summary.buyButton.addEventListener('click', (event: Event) =>
      this.controller.openModalWindow(event, this.view.openModal.bind(this.view))
    );
  }

  private initModalListeners() {
    this.view.modal.overlay.addEventListener('click', this.modalControllers.closeModal);
    this.view.modal.creditCard.creditCardNumber.addEventListener('input', (event: Event) => {
      this.modalControllers.setPaymentSystem(event, this.view.modal.creditCard.paymentSystem);
    });
    this.view.modal.creditCard.expiration.addEventListener('input', (event: Event) => {
      this.modalControllers.expirationSlash(event);
    });
    this.view.modal.creditCard.cvv.addEventListener('input', (event: Event) => {
      this.modalControllers.enterCvv(event);
    });
    this.view.modal.modal.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.modalControllers.ordering(
        this.view.modal.modal,
        this.view.modal.creditCard.expiration,
        this.controller.openStartPage.bind(this.controller)
      );
    });
  }

  initRouterListener() {
    window.addEventListener('popstate', (event: Event, data = this.controller.reloadPage()) =>
      this.view.reloadPage(data)
    );
  }
}
