import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, debounce, Observable, timer } from 'rxjs';
import { Store } from "../../store";
import { PoNumberAlertData } from "../../orders/add-po-number/add-po-number.component";
import { InvNumberAlertData } from 'src/app/orders/add-inv-number/add-inv-number.component';


@Component({
  selector: 'app-order-board-popup',
  templateUrl: './order-board-popup.component.html',
  styleUrls: ['./order-board-popup.component.scss']
})
export class OrderBoardPopupComponent implements OnInit {

    @Input() card;
    @Input() col;
    @Input() params;
    @Input() idx;
    @Output() updateRequested = new EventEmitter();
    @Output() swapSupplierRequested = new EventEmitter();
    @Output() addTracking = new EventEmitter();
    @Output() orderModalRequested = new EventEmitter();
    @Output() cancelOrderLine = new EventEmitter();
    @Output() assignOrderLine = new EventEmitter();
    @Output() confirmOrderLine = new EventEmitter();
    @Output() back = new EventEmitter<any>();
    @Output() showPoNumberModal = new EventEmitter<PoNumberAlertData>();
    @Output() showInvNumberModal = new EventEmitter<InvNumberAlertData>();
   

    showAssignOrderConfirmation = false;
    showConfirmOrderConfirmation = false;
    showConfirmOrderProduction = false;
    showReadyForCollection = false;
    showConfirmInTransit = false;
    showConfirmCompleted = false;

    updateRequestTooltip$: BehaviorSubject<boolean> = (new BehaviorSubject<boolean>(false));
    updateRequestTooltip$$: Observable<boolean> = this.updateRequestTooltip$.pipe(debounce(val => timer(50)));


    constructor(
        private store: Store,
        
    ) {
    }

    ngOnInit(): void {


      console.log('card is ',this.card);
    }

    onClickOutside(event) {
        if (event.value) {
            this.closeAllPopups('');
        }
    }

  



    assignOrder(moveToConfirmation) {
      console.log('moveToConfirmation',moveToConfirmation);
        this.assignOrderLine.emit({ card: this.card, moveToConfirmation });
    }

    edit() {
        this.orderModalRequested.emit({ orderDetail: this.card });
    }

    confirmCancel() {
        this.cancelOrderLine.emit(this.card);
    }

    closeAllPopups(toIgnore) {
        const orderDetailBoard = this.store.selectForLocal('orderDetailBoard');
        orderDetailBoard.groups.forEach((g) => {
            g.cols.forEach((c) => {
                c.orderLines.forEach((ol) => {
                    if (ol.id !== toIgnore) {
                        ol.open = false;
                    }
                });
            });
        });
        this.store.set('orderDetailBoard', orderDetailBoard);
    }

    requestUpdate() {
        this.closeAllPopups('');
        this.updateRequested.emit(this.card);
    }

    swapSupplier() {
        console.log('123', this.card);
        this.swapSupplierRequested.emit({ orderDetail: this.card });
    }

    addtracking() {
        this.addTracking.emit(this.card);
    }

    confirmOrder() {
        this.confirmOrderLine.emit({ orderDetail: this.card })
    }

   

    public backHandler(): void {
        this.back.emit(this.card);
    }
    public showPoNumber(){
        console.log('12');
        this.showPoNumberModal.emit({
        showPoNumberModal: true,
        cancelText: '',
        confirmText: '',
        data: '',
        confirmClass: null,
        template: null
        });
    }

    public showInvNumber(){
        this.showInvNumberModal.emit({
        showInvNumberModal: true,
        cancelText: '',
        confirmText: '',
        data: '',
        confirmClass: null,
        template: null
        });
    }

}
