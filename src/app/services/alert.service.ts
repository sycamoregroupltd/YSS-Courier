import { Injectable } from '@angular/core';
import {Store} from '../store';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private store: Store,
  ) {
  }

  notification(notifications, timeout) {
    const g = this.store.selectForLocal('alerts');
    g.errors = [];
    g.notifications = notifications;
    g.confirmAction = undefined;
    g.simple  = '';
    this.store.set('alerts', g);

    setTimeout(() => {
      this.clearMessage();
    }, timeout);
  }

  error(errors) {
    const g = this.store.selectForLocal('alerts');
    g.errors = errors;
    g.notifications = [];
    g.confirmAction = undefined;
    g.simple  = '';
    this.store.set('alerts', g);
  }

  clearMessage() {
    const g = this.store.selectForLocal('alerts');
    g.errors = [];
    g.notifications = [];
    g.confirmAction = undefined;
    g.simple  = '';
    this.store.set('alerts', g);
  }

}
