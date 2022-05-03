import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../../store';
import { OrdersService } from '../../services/orders.service';
import { AlertService } from '../../services/alert.service';
import { OverlayService } from '../../services/overlay.service';

@Component({
    selector: 'app-account-order-overview',
    templateUrl: './account-order-overview.component.html',
    styleUrls: ['./account-order-overview.component.scss']
})
export class AccountOrderOverviewComponent implements OnInit {

    overlays$ = this.store.select<any>('overlays');
    order;
    orderId;
    orderLineToEdit;
    orderLineCopy;
    statuses = [];
    user;

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private overlayService: OverlayService,
        private ordersService: OrdersService,
        private alertService: AlertService,
    ) {
    }

    ngOnInit(): void {
        this.user = this.store.selectForLocal('user');
        this.orderId = this.route.snapshot.params.id;
        this.getOrderLineStatuses();
        this.findOne();
    }

    findOne() {
        this.ordersService.getOrder(this.orderId).subscribe(data => {
            this.order = data.data;
        });
    }

    editOrderLine(idx) {
        this.order.orderLines[idx].edit = true;
        this.orderLineToEdit = Object.assign({}, this.order.orderLines[idx]);
        this.orderLineCopy = Object.assign({}, this.order.orderLines[idx]);
    }

    cancelEditOrderLine(idx) {
        Object.assign(this.order.orderLines[idx], this.orderLineCopy);
        this.order.orderLines[idx].edit = false;
        this.orderLineToEdit = undefined;
        this.orderLineCopy = undefined;
    }

    saveOrderLine(idx) {
        console.log(this.orderLineToEdit)
        Object.assign(this.order.orderLines[idx], this.orderLineToEdit);
        this.order.orderLines[idx].edit = false;
        this.order.orderLines[idx].totalPrice = (+this.order.orderLines[idx].unitPrice * +this.order.orderLines[idx].quantity).toFixed(2)
        this.orderLineToEdit = undefined;
        this.orderLineCopy = undefined;
        this.reCalculateOrderTotals();
    }

    getOrderLineStatuses() {
        this.ordersService.getOrderLineStatuses().subscribe(data => {
            this.statuses = data.data;
        });
    }

    reCalculateOrderTotals() {
        let net = 0;
        for (let i = 0; i < this.order.orderLines.length; i++) {
            net = net + (parseInt(this.order.orderLines[i].unitPrice, 10) * +this.order.orderLines[i].quantity);
        }

        if (this.order.payment.voucher) {
            if (this.order.payment.voucher.discountType === 1) {
                this.order.payment.discount = ((net / 100) * +this.order.payment.voucher.discountValue);
            }
            if (this.order.payment.voucher.discountType === 2) {
                this.order.payment.discount = +this.order.payment.voucher.discountValue;
            }
            net = net - this.order.payment.discount;
        }
        const vat = ((+net / 100) * 20).toFixed(2);
        const gross = (+net + +vat).toFixed(2);
        this.order.payment.net = net;
        this.order.payment.vat = vat;
        this.order.payment.gross = gross;
    }

    updateOrderStatus() {
        this.overlayService.toggle('orderStatusUpdate');
    }

    update() {
        this.ordersService.update(this.order).subscribe(data => {
            this.alertService.notification(['Order details updated'], 3000);
        });
    }
}
