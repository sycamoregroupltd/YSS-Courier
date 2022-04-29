import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '../../store';

@Component({
    selector: 'app-account-overview',
    templateUrl: './account-overview.component.html',
    styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit {
    @Input() user;
    @Output() navigationChange = new EventEmitter();

    overlays$ = this.store.select<any>('overlays');

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit(): void {
    }

    addUser() {
        this.store.set('userToEdit', undefined);
        this.setStep('user-edit');
    }
    editUser(user) {
        this.store.set('userToEdit', user);
        this.setStep('user-edit');
    }

    setStep(v) {
        this.navigationChange.emit(v);
    }

}
