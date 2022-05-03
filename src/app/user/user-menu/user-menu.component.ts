import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '../../store';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
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
