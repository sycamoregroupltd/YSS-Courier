import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { Store } from 'src/app/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@Component({
  selector: 'app-order-assign',
  templateUrl: './order-assign.component.html',
  styleUrls: ['./order-assign.component.css']
})
export class OrderAssignComponent implements OnInit {

  @Input() orderDetail;
  @Input() moveToConfirmation = false;
  @Input() users;

  @Output() close = new EventEmitter();

  userSelected;

  constructor(
      private store: Store,
      private toastrService: ToastrService,
      private orderService: OrdersService,
  ) {
  }

  ngOnInit(): void {
      if (this.orderDetail.allocatedTo) {
          this.userSelected = this.orderDetail.allocatedTo.id;
      }

      if (!this.users) {

      }
  }

  onSubmit() {
      const dataToSend = {
          orderDetail: this.orderDetail,
          orderId: this.orderDetail.orderId,
          orderDetailId: this.orderDetail.id,
          userId: this.userSelected,
          moveToConfirmation: this.moveToConfirmation,
      };
      this.orderService.assignUser(dataToSend).subscribe(data => {
          this.close.emit({ action: true });
      });
  }

  cancel() {
      this.close.emit({ action: false });
  }

}
