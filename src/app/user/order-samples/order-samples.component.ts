import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from '../../store';

@Component({
  selector: 'app-order-samples',
  templateUrl: './order-samples.component.html',
  styleUrls: ['./order-samples.component.css']
})
export class OrderSamplesComponent implements OnInit {


    @Output() navigationChange = new EventEmitter();
    user;
    showSupplier = false;
    showCustomer = false;

    orderParams = {
        customer: '',
        orderId: '',
        invoiceId: '',
        customerId: '',
        supplierId: '',
        supplier: '',
        status: '',
        dueDate: '',
        isSample: 1,
        shippingStatus: '',
        freeText: '',
        all: true,
        thisWeek: false,
        thisMonth: false,
        limit: 10,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'order_details.createdAt DESC',
        sorts: [],
    };


    constructor(
        private store: Store,
    ) { }

    ngOnInit(): void {
        this.user = this.store.selectForLocal('user');
        if (this.user.accountType === 'customer') {
            this.showSupplier = true;
            this.showCustomer = false;
            this.orderParams.customerId = this.user.id;
        } else {
            this.showSupplier = false;
            this.showCustomer = true;
            this.orderParams.supplierId = this.user.company.id;

        }

    }




}
