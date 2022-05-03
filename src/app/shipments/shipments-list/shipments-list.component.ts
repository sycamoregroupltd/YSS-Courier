import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { debounce } from 'lodash';
import { ShipmentService } from '../../services/shipment.service';
import { Store } from '../../store';
import { OverlayService } from '../../services/overlay.service';
import { AlertService } from '../../services/alert.service';
import { NotificationService } from '../../services/notification.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from 'saturn-datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
    selector: 'app-shipments-list',
    templateUrl: './shipments-list.component.html',
    styleUrls: ['./shipments-list.component.scss'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]

})
export class ShipmentsListComponent implements OnInit, OnChanges {
    @Input() params;

    user;
    overlays$ = this.store.select<any>('overlays');
    overlayData;
    confirmationData = {
        open: false,
        title: '',
        detail: '',
        data: undefined
    };

    items = [];
    statuses = [];

    constructor(
        private shipmentService: ShipmentService,
        private ordersService: OrdersService,
        private store: Store,
        private overlayService: OverlayService,
        private alertService: AlertService,
        private notificationService: NotificationService,
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.filterSearch();
        this.user = this.store.selectForLocal('user');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.params) {
            this.filterSearch();
        }
    }

    filterSearch() {
        this.params.page = 0;
        this.getStatuses();
        this.search();
    }

    getStatuses() {
        this.ordersService.getOrderLineStatuses().subscribe(data => {
            this.statuses = data.data;
        });
    }

    updateStatus(s) {
        const statusFound = this.statuses.find((status) => status.id === s.status.id);
        if (statusFound) {
            s.status = statusFound;
            this.shipmentService.setStatus(statusFound, s.id).subscribe(data => {
                const notificationData = {
                    type: 'courier',
                    subject: 'Delivery update',
                    content: `Delivery status for order number ${s.orderIdPublic} has been updated to ${statusFound.name}`,
                    orderId: s.orderId,
                    shipmentId: s.id,
                    recipient: s.customer,

                };
                this.notificationService.send(notificationData);
            });
        }
    }


    updateShippingDate(s) {
        this.shipmentService.setShippingDate(s).subscribe(data => {

            const notificationData = {
                companyId: '',
                type: 'courier',
                subject: 'Delivery update',
                content: `Your delivery date for order ${s.orderIdPublic} has been confirmed as ${s.confirmedShippingDate.format('dddd, MMMM Do YYYY')}`,
                orderId: s.orderId,
                shipmentId: s.id,
                recipient: s.customer,

            };
            this.notificationService.send(notificationData);

        });
    }

    updateCollectionDate(s) {
        this.shipmentService.setCollectionDate(s).subscribe(data => {

            const notificationData = {
                companyId: s.supplier,
                type: 'courier',
                subject: 'Collection update',
                content: `Your collection date for Yorkstone Supplies order ${s.orderIdPublic} has been confirmed as ${s.collectionDate.format('dddd, MMMM Do YYYY')}`,
                orderId: s.orderId,
                shipmentId: s.id,
                recipient: '',

            };
            this.notificationService.send(notificationData);

        });
    }


    search() {
        this.shipmentService.search(this.params).subscribe(data => {
            this.items = data.data.data;

            this.params.pages = Math.ceil(data.data.totalRecords / this.params.limit);
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }
        });
    }

    assignVehicle(item) {
        this.overlayData = {
            item,
            companyId: this.user.company.id,
        };
        this.overlayService.toggle('shipmentVehicle');
    }


    confirmationComplete(e) {
        this.confirmationData.open = false;
        if (e.action) {
        }
    }

}
