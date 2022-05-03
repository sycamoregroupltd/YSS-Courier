import { Store } from '../../store';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer-ipad',
    templateUrl: './footer-ipad.component.html',
    styleUrls: ['./footer-ipad.component.scss'],
})
export class FooterIpadComponent implements OnInit {
    menu$ = this.store.select<any>('menu');
    settings$ = this.store.select<any>('settings');
    email = '';

    constructor(private store: Store) {
    }

    ngOnInit(): void {
    }
}
