import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderLineStatus } from 'src/app/models/order-line-status';


@Component({
  selector: 'app-move-back-modal',
  templateUrl: './move-back-modal.component.html',
  styleUrls: ['./move-back-modal.component.css']
})
export class MoveBackModalComponent implements OnInit {

  public orderLineStatuses: OrderLineStatus[];
  public selectedStatus: any;
  @Input() currentStatus: any;
  @Output() complete = new EventEmitter();

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrderLinesStatuses();
  }

  private getOrderLinesStatuses(): void {
    this.ordersService.getOrderLineStatuses().subscribe(({ data }: { data: any[] }) => {
      this.orderLineStatuses = data.filter(item => item.id < this.currentStatus.id).sort((a, b) => a.id < b.id ? -1 : 1);
    });
  }

  public cancel(): void {
    this.complete.emit({ confirmed: false });
  }

  public submit(): void {
    this.complete.emit({ confirmed: true, newStatus: this.selectedStatus });
  }

}
