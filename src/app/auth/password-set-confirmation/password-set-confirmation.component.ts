import { Store } from '../../store';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-password-set-confirmation',
    templateUrl: './password-set-confirmation.component.html',
    styleUrls: ['./password-set-confirmation.component.scss']
})
export class PasswordSetConfirmationComponent implements OnInit {

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit(): void {
        this.store.set('navigationHistory', []);
    }

}
