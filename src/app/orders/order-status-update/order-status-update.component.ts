import {Component, Input, OnInit} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {OverlayService} from '../../services/overlay.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatDatepickerModule} from 'saturn-datepicker';
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-order-status-update',
    templateUrl: './order-status-update.component.html',
    styleUrls: ['./order-status-update.component.css'],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ]

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
