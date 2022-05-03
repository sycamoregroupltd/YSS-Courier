import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '../../store';
import { OverlayService } from '../../services/overlay.service';

@Component({
    selector: 'app-supplier-overview',
    templateUrl: './supplier-overview.component.html',
    styleUrls: ['./supplier-overview.component.scss']
})
export class SupplierOverviewComponent implements OnInit {
    @Input() step;
    @Input() user;
    @Output() navigationChange = new EventEmitter();

    overlays$ = this.store.select<any>('overlays');
    overlayDataRequest;

    orderParams = {
        customer: '',
        orderId: '',
        invoiceId: '',
        supplierId: '',
        supplier: '',
        status: '',
        dueDate: '',
        shippingStatus: '',
        isSample: 0,
        freeText: '',
        all: true,
        thisWeek: false,
        thisMonth: false,
        limit: 5,
        limits: [5, 10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'orders.createdAt DESC',
        sorts: [],
    };

    sampleParams = {
        customer: '',
        orderId: '',
        invoiceId: '',
        supplierId: '',
        supplier: '',
        status: '',
        dueDate: '',
        shippingStatus: '',
        isSample: 1,
        freeText: '',
        all: true,
        thisWeek: false,
        thisMonth: false,
        limit: 5,
        limits: [5, 10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'orders.createdAt DESC',
        sorts: [],
    };

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

    userParams = {
        company: '',
        name: '',
        email: '',
        jobTitle: '',
        town: '',
        postcode: '',
        mobile: '',
        landline: '',
        status: '',
        freeText: '',
        companyId: '',
        accountType: '',
        limit: 10,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'contacts.firstname',
        sorts: [],
    };

    constructor(
        private store: Store,
        private overlayService: OverlayService,
    ) {
    }

    ngOnInit(): void {
        console.log(this.user);
        this.orderParams.supplierId = this.user.company.id;
        this.sampleParams.supplierId = this.user.company.id;
        this.productParams.supplierId = this.user.company.id;
        this.userParams.companyId = this.user.company.id;
    }

    setOrderParams(field, value) {
        this.orderParams.all = false;
        this.orderParams.thisWeek = false;
        this.orderParams.thisMonth = false;
        this.orderParams[field] = value;

        this.orderParams = Object.assign({}, this.orderParams);
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

    requestCreate() {
        this.overlayDataRequest = {
            id: '',
            companyId: '',
            createdBy: '',
            type: 0,
            message: '',
        };

        this.store.set('overlayData', this.overlayDataRequest);
        this.overlayService.toggle('requestCreate');

    }

}
