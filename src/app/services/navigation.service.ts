import { Injectable } from '@angular/core';
import {Store} from '../store';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
      private store: Store,
  ) { }

  setStep(f, v) {
      const nav = this.store.selectForLocal('navigation');
      nav[f] = v;
      this.store.set('navigation', nav);
  }

}
