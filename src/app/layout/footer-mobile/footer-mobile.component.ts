import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';

@Component({
    selector: 'app-footer-mobile',
    templateUrl: './footer-mobile.component.html',
    styleUrls: ['./footer-mobile.component.scss']
})
export class FooterMobileComponent implements OnInit {

    menu$ = this.store.select<any>('menu');
    settings$ = this.store.select<any>('settings');
    email = '';

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit(): void {
    }


}
