import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { OverlayService } from '../../services/overlay.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-order-status-update',
    templateUrl: './order-status-update.component.html',
    styleUrls: ['./order-status-update.component.scss']
})
export class OrderStatusUpdateComponent implements OnInit {
    @Input() order;
    @Input() statuses;

    constructor(
        private ordersService: OrdersService,
        private overlayService: OverlayService,
        private toastrService: ToastrService,
    ) {
    }

    ngOnInit(): void {
    }

    close() {
        this.overlayService.toggle('orderStatusUpdate');
    }

    save() {
        this.ordersService.updateStatus(this.order).subscribe(data => {
            this.toastrService.success('Status update submitted');
            this.close();
        });
    }
}
