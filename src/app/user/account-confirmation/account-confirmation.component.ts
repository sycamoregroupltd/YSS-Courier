import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';

@Component({
    selector: 'app-account-confirmation',
    templateUrl: './account-confirmation.component.html',
    styleUrls: ['./account-confirmation.component.scss']
})
export class AccountConfirmationComponent implements OnInit {

    accountType$ = this.store.select<string>('accountType');

    email = '';

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit(): void {
        this.email = this.store.selectForLocal('confirmationEmail');
    }
}
