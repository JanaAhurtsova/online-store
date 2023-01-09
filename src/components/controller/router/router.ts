import { TQuery } from '../../../globalType';
import { TOptions } from './routerTypes';

class Router {
  routes: Array<RegExp> = [];

  mode: string;

  root = '/';

  current = '';

  constructor(options: TOptions) {
    this.mode = options.mode;
    this.root = options.root;
  }

  add = (path: RegExp) => {
    this.routes.push(path);
    return this;
  };

  remove = (path: RegExp) => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i] === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = () => {
    this.routes = [];
    return this;
  };

  clearSlashes = (path: string) => path.toString().replace(/\/$/, '').replace(/^\//, '');

  getFragment = () => {
    let fragment = '';

    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  };

  navigate = (path: string) => {
    if (this.mode === 'history') {
      window.history.pushState(null, 'null', this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
      this.current = '';
    }
    return this;
  };

  splitURL = () => {
    let result: TQuery[] = [];
    this.current = this.getFragment();
    this.routes.forEach((route) => {
      const match = this.current.match(route);
      if (match) {
        result = match
          .map((item) => item.split(/=|\//))
          .map((item) => {
            let data = item[1];
            if (item[1] === undefined) {
              data = '';
            }
            return {
              type: item[0],
              name: data.split('|'),
            };
          });
      }
    });
    return result;
  };
}

export default Router;
