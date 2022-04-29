import { Component, OnInit } from '@angular/core';
import {Store} from '../../store';
import {OverlayService} from '../../services/overlay.service';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.css']
})
export class MenuMobileComponent implements OnInit {

    menu$ = this.store.select<any>('menu');

    constructor(
      private store: Store,
      private overlayService: OverlayService,
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.store.set('mobileMenu', false);
    this.overlayService.closeAll();
  }
}
