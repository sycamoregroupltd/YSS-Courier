import {Component, Input, OnInit} from "@angular/core";
import {Store} from "../../store";
import {OrdersService} from "../../services/orders.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-order-overview-line',
  templateUrl: './order-overview-line.component.html',
  styleUrls: ['./order-overview-line.component.scss']
})
export class OrderOverviewLineComponent implements OnInit {

  @Input() order;

  orderLineToEdit;
  orderLineCopy;
  statuses = [];
  admins;

  constructor(
      private store: Store,
      private ordersService: OrdersService,
      private userService: UserService,
  ) {
  }

  ngOnInit(): void
  {
      this.getOrderLineStatuses();
      this.userService.getAdmins().subscribe(data => this.admins = data.data);
  }

  getOrderLineStatuses()
  {
      this.ordersService.getOrderLineStatuses().subscribe(data => {
          this.statuses = data.data;
      });
  }

  editOrderLine(idx)
  {
      this.order.orderLines[idx].edit = true;
      this.orderLineToEdit = Object.assign({}, this.order.orderLines[idx]);
      this.orderLineCopy = Object.assign({}, this.order.orderLines[idx]);
  }

  cancelEditOrderLine(idx)
  {
      Object.assign(this.order.orderLines[idx], this.orderLineCopy);
      this.order.orderLines[idx].edit = false;
      this.orderLineToEdit = undefined;
      this.orderLineCopy = undefined;
  }

  saveOrderLine(idx)
  {
      if ((this.orderLineToEdit.allocatedTo.id && !this.order.orderLines[idx].allocatedTo) ||
          this.orderLineToEdit.allocatedTo.id !== this.order.orderLines[idx].allocatedTo.id
      ) {
          this.allocateTo(this.orderLineToEdit.allocatedTo, idx);
      }
      Object.assign(this.order.orderLines[idx], this.orderLineToEdit);
      this.order.orderLines[idx].edit = false;
      this.order.orderLines[idx].totalPrice = +this.order.orderLines[idx].unitPrice * +this.order.orderLines[idx].quantity;
      this.orderLineToEdit = undefined;
      this.orderLineCopy = undefined;
      this.reCalculateOrderTotals();
  }

  reCalculateOrderTotals()
  {
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
      const vat = (net / 100) * 20;
      const gross = net + vat;
      this.order.payment.net = net;
      this.order.payment.vat = vat;
      this.order.payment.gross = gross;
  }

  allocateTo(user, orderLineI)
  {
      const dataToSend = {
          orderDetail: this.order.orderLines[orderLineI],
          orderId: this.order.id,
          orderDetailId: this.order.orderLines[orderLineI].id,
          userId: user.id,
          moveToConfirmation: false,
      };

      this.ordersService.assignUser(dataToSend).subscribe();
  }

}
