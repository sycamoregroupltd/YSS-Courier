import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '../../store';
import { OverlayService } from '../../services/overlay.service';

@Component({
    selector: 'app-courier-overview',
    templateUrl: './courier-overview.component.html',
    styleUrls: ['./courier-overview.component.scss']
})
export class CourierOverviewComponent implements OnInit {
    @Input() step;
    @Input() user;
    @Output() navigationChange = new EventEmitter();

    overlays$ = this.store.select<any>('overlays');
    overlayData;

    shipmentParams = {
        courierId: '',
        orderId: '',
        createdAt: undefined,
        publicId: '',
        customer: '',
        supplier: '',
        weight: '',
        pallets: '',
        vehicle: '',
        status: '',
        estDeliveryDate: undefined,
        all: true,
        thisWeek: false,
        thisMonth: false,
        limit: 10,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'shipments.confirmedShippingDate',
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
        this.shipmentParams.courierId = this.user.company.id;
        this.userParams.companyId = this.user.company.id;
    }

    setOrderParams(field, value) {
        this.shipmentParams.all = false;
        this.shipmentParams.thisWeek = false;
        this.shipmentParams.thisMonth = false;
        this.shipmentParams[field] = value;

        this.shipmentParams = Object.assign({}, this.shipmentParams);
    }


    addUser() {
        this.store.set('userToEdit', undefined);
        const overlayData = {
            user: undefined,
            accountType: this.user.accountType,
            company: this.user.company,
        };
        this.store.set('overlayData', overlayData);

        this.overlayService.toggle('userEdit');
    }

    editUser(user) {
        this.store.set('userToEdit', user);
        this.overlayData = {
            user: this.user,
            companyId: this.user.company.id,
        };
        this.store.set('overlayData', this.overlayData);
        this.overlayService.toggle('userEdit');
    }

    setStep(v) {
        this.navigationChange.emit(v);
    }
}
