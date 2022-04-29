import {Component, OnInit} from '@angular/core';
import {Store} from '../../store';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

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
