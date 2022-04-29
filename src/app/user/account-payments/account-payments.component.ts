import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from '../../store';

@Component({
    selector: 'app-account-payments',
    templateUrl: './account-payments.component.html',
    styleUrls: ['./account-payments.component.css']
})
export class AccountPaymentsComponent implements OnInit {
    @Output() navigationChange = new EventEmitter();
    user;

    paymentParams = {
        customer: '',
        userId: '',
        orderId: '',
        customerId: '',
        status: '',
        all: true,
        thisWeek: false,
        thisMonth: false,
        limit: 10,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'orders.createdAt DESC',
        sorts: [],
    };

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit(): void {
        this.user = this.store.selectForLocal('user');
        this.paymentParams.userId = this.user.id;
    }

}
