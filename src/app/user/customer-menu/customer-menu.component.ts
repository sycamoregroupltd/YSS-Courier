import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '../../store';

@Component({
    selector: 'app-customer-menu',
    templateUrl: './customer-menu.component.html',
    styleUrls: ['./customer-menu.component.scss']
})
export class CustomerMenuComponent implements OnInit {
    @Input() user;
    @Output() navigationChange = new EventEmitter();

    step = 'dashboard';

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit(): void {
    }

    setStep(v) {
        this.step = v;
        this.navigationChange.emit(v);
    }

    editUser() {
        this.store.set('userToEdit', this.store.selectForLocal('user'));
        this.setStep('user-edit');
    }

    addUser() {
        this.store.set('userToEdit', this.store.selectForLocal('user'));
        this.setStep('user-edit');
    }
}
