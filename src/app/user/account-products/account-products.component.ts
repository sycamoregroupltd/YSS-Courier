import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';

@Component({
    selector: 'app-account-products',
    templateUrl: './account-products.component.html',
    styleUrls: ['./account-products.component.scss']
})
export class AccountProductsComponent implements OnInit {
    user;
    overlays$ = this.store.select<any>('overlays');

    productParams = {
        productCode: '',
        name: '',
        description: '',
        supplierId: '',
        supplier: '',
        margin: '',
        group: '',
        range: '',
        freeText: '',
        limit: 10,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'products.id',
        sorts: [],
    };

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit(): void {
        this.user = this.store.selectForLocal('user');
        this.productParams.supplierId = this.user.company.id;
    }
}
