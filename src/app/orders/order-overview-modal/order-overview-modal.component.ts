import { OrdersService } from '../../services/orders.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AlertService} from '../../services/alert.service';
import { OrderOverviewComponent } from '../order-overview/order-overview.component';

@Component({
    selector: 'app-order-overview-modal',
    templateUrl: './order-overview-modal.component.html',
    styleUrls: ['./order-overview-modal.component.scss']
})
export class OrderOverviewModalComponent implements OnInit {
    @Input() orderId;
    @Input() orderDetail;
    @Output() orderModalComplete: EventEmitter<any> = new EventEmitter<any>();
    order;

    constructor(
        private ordersService: OrdersService,
        private alertService: AlertService,
    ) { }

    ngOnInit(): void {
        this.findOne();
    }

    findOne() {
        this.ordersService.findOne(this.orderId).subscribe(data => {
            this.order = data.data;
        });
    }

    update() {
        this.ordersService.update(this.order).subscribe(data => {
            this.alertService.notification(['Order details updated'], 3000);
        });
    }

    cancel() {
        const dataToEmit = {
            updated: false,
        };
        this.orderModalComplete.emit(dataToEmit);
    }
}
