import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../../store';
import { OverlayService } from '../../services/overlay.service';
import { ShipmentService } from '../../services/shipment.service';
import { AlertService } from '../../services/alert.service';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'app-account-shipment-overview',
    templateUrl: './account-shipment-overview.component.html',
    styleUrls: ['./account-shipment-overview.component.scss']
})
export class AccountShipmentOverviewComponent implements OnInit {

    statuses = [];
    user;
    shipment;
    shipmentId;

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private overlayService: OverlayService,
        private shipmentService: ShipmentService,
        private alertService: AlertService,
        private ordersService: OrdersService,
    ) {
    }

    ngOnInit(): void {
        this.user = this.store.selectForLocal('user');
        this.shipmentId = this.route.snapshot.params.id;
        this.getOrderLineStatuses();
        this.findOne();
    }

    findOne() {
        this.shipmentService.get(this.shipmentId).subscribe(data => this.shipment = data.data);
    }

    getOrderLineStatuses() {
        this.ordersService.getOrderLineStatuses().subscribe(data => {
            this.statuses = data.data;
        });
    }

    updateStatus() {

    }
}
