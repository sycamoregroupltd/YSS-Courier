import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourierService } from '../../services/courier.service';
import { OverlayService } from '../../services/overlay.service';
import { Store } from '../../store';
import { AlertService } from '../../services/alert.service';
import { ToolsService } from '../../services/tools.service';
import { ShipmentService } from '../../services/shipment.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-shipment-vehicle',
    templateUrl: './shipment-vehicle.component.html',
    styleUrls: ['./shipment-vehicle.component.scss']
})
export class ShipmentVehicleComponent implements OnInit {
    @Input() overlayData;
    @Output() refreshData = new EventEmitter();

    confirmationData = {
        open: false,
        buttonText: 'Confirm',
        title: '',
        detail: '',
        data: undefined,
    };
    params = {
        courier: '',
        type: '',
        limit: 5,
        limits: [5, 10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'courier_vehicle.createdAt DESC',
        sorts: [],
    };

    vehicles = [];

    constructor(
        private courierService: CourierService,
        private overlayService: OverlayService,
        private shipmentService: ShipmentService,
        private store: Store,
        private alertService: AlertService,
        private toolsService: ToolsService,
        private notificationService: NotificationService,
    ) {
    }

    ngOnInit(): void {
        console.log(this.overlayData)
        this.params.courier = this.overlayData.companyId;
        this.getShipment();
        this.search();
    }

    getShipment() {
        this.shipmentService.get(this.overlayData.item.id).subscribe(data => {
            console.log(data);
        });
    }

    search() {
        this.courierService.searchVehicles(this.params).subscribe((data) => {
            this.vehicles = data.data.data;

            this.params.pages = Math.ceil(data.data.totalRecords / this.params.limit);
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }
        });
    }

    setVehicle(vehicle) {
        this.overlayData.item.vehicle = vehicle;
        this.shipmentService.assignVehicle(vehicle.id, this.overlayData.item.id).subscribe(data => {

            const notificationData = {
                subject: 'Delivery update',
                content: `Vehicle ${vehicle.registration} has been assigned to shipment ${this.overlayData.item.id}`,
                recipient: 'admin',
                shipmentId: this.overlayData.item.id,
                type: 'courier',
            };
            this.notificationService.send(notificationData);

            this.refreshData.emit(true);
        });
    }

    confirmCancel() {
        this.confirmationData.title = 'Are you sure you want to cancel?';
        this.confirmationData.data = {};
        this.confirmationData.detail = '';
        this.confirmationData.open = true;
    }

    confirmationComplete(e) {
        this.confirmationData.open = false;
        if (e.action) {
            this.close();
        } else {
        }
    }

    close() {
        this.overlayService.closeAll();
    }
}
