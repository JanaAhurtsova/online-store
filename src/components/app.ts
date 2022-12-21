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
    this.view.store.sideBar.filter.addEventListener('click', (event: Event) => this.controller.clickFilter(event));
    this.view.store.store.addEventListener('click', (event: Event, data = this.controller.clickProduct(event)) =>
      this.view.clickProduct(data)
    );
    this.view.store.sorter.sorter.addEventListener('change', (event: Event) => this.controller.sort(event));
    // this.view.removeFilter.addEventListener('click', (event:Event) => this.controller.removeFilter(event))
    window.addEventListener('popstate', (event: Event, data = this.controller.reloadPage()) =>
      this.view.reloadPage(data)
    );
    this.view.reloadPage(this.controller.reloadPage());
  }
}
