import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '../../store';
import { ShipmentService } from '../../services/shipment.service';
import { UserService } from '../../services/user.service';
import { OrdersService } from '../../services/orders.service';
import { debounce } from 'lodash';
import { OrderBoardPopupComponent } from '../order-board-popup/order-board-popup.component';
import {PopoverModule} from 'ngx-bootstrap/popover';
import { AvailbleBSPositions } from 'ngx-bootstrap/positioning';
import { OrderAssignComponent } from 'src/app/orders/order-assign/order-assign.component';
import { OrderBoardSwapSupplierComponent } from 'src/app/orders/order-board-swap-supplier/order-board-swap-supplier.component';




@Component({
    selector: 'app-shipments-board',
    templateUrl: './shipments-board.component.html',
    styleUrls: ['./shipments-board.component.scss']
})
export class ShipmentsBoardComponent implements OnInit {

    user$ = this.store.select<any>('user');
    shipmentsBoard$ = this.store.select<any>('shipmentsBoard');
    popoverPos: AvailbleBSPositions = "right top";
    public backConfirmModal = { show: false, card: undefined };
    @Input() card;
    @Input() col;
    @Input() idx;

    updateRequested = false;
    shipment;
    orderDetail;
    orderId;
    addingTracking = false;
    showOrderCancel = false;
    orderToCancel = null;
    swapSupplier = false;
    moveToConfirmation = false;
    assigningOrder = false;
    viewOrderModal = false;
    


    orderConfirmationData = {
        open: false,
        buttonText: 'Confirm',
        title: '',
        detail: '',
        data: undefined,
    };

    params = {
        
        courierId: '',
        orderId: '',
        createdAt: undefined,
        publicId: '',
        customer: '',
        supplier: '',
        weight: '',
        pallets: '',
        vehicle: '',
        status: '',
        estDeliveryDate: undefined,
        all: true,
        thisWeek: false,
        thisMonth: false,
        limit: 1000,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'shipments.confirmedShippingDate',
        sorts: [],
    };

    admins = [];

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
        event: KeyboardEvent
    ) {
        this.closeAllPopups('');
        this.requestUpdateCompleted({ refresh: false });
    }

    constructor(
        private store: Store,
        private ordersService: OrdersService,
        private userService: UserService,
        private shipmentService: ShipmentService,

      
        
       
        
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.getShipments();
        this.getAdmins();
    }

    filterSearch() {
        this.getShipments();
    }

    getAdmins() {
         this.userService.getAdmins().subscribe(data => {
             this.admins = data.data;
         })
    }

    getShipments() {
        this.shipmentService.shipmentsBoard(this.params)
            .subscribe(data => {
            });
    }

    assignBgCol(orderLine) {
        let bgCol = 'text-success';
        if (orderLine.dueDays < 3) {
            bgCol = 'text-danger';
        }
        if (orderLine.dueDays >= 3 && orderLine.dueDays < 5) {
            bgCol = 'text-warning';
        }
        return bgCol;
    }

    open(card) {
        console.log("Selected Card Details: ",card)
        card.open = !card.open;
        this.closeAllPopups(card.id);
    }

    closeAllPopups(toIgnore) {
        const shipmentsBoard = this.store.selectForLocal('shipmentsBoard');
        console.log("All Card's Details:", shipmentsBoard);
        shipmentsBoard.groups.forEach(g => {
            g.cols.forEach(c => {
                c.cards.forEach(ol => {
                    if (ol.id !== toIgnore) {
                        console.log("condition True:", g.name)
                        ol.open = false;
                    }
                });
            });
        });
        this.store.set('shipmentsBoard', shipmentsBoard);
    }

    requestUpdate(shipment) {
        this.shipment = shipment;
        this.updateRequested = true;
    }

    requestUpdateCompleted(e) {
        this.updateRequested = false;
        if (e.refresh) {
            this.shipmentService.shipmentsBoard(this.params).subscribe();
        }
    }
    public showBackModal(card: any): void {
        this.backConfirmModal.card = card;
        this.backConfirmModal.show = true;
    }
    confirmOrderLine(e) {
        this.orderConfirmationData.title = `Has the supplier agreed to the terms of this order?`;
        this.orderConfirmationData.data = e.orderDetail;
        this.orderConfirmationData.detail = '';
        this.orderConfirmationData.open = true;
    }
    triggerAddingTracking(e) {
        this.orderDetail = e;
        this.addingTracking = true;
    }

    confirmCancellation(order: object) {
        this.closeAllPopups('');
        this.showOrderCancel = true;
        this.orderToCancel = order;
    }
    swapSupplierRequested(e) {
        this.orderDetail = e.orderDetail;
        this.orderId = e.orderDetail.orderId;
        this.swapSupplier = true;
    }

    triggerOrderAssign(e) {
        this.orderDetail = e.card;
        this.moveToConfirmation = e.moveToConfirmation;
        this.assigningOrder = true;
    }
    orderModalRequested(e) {
        this.orderDetail = e.orderDetail;
        this.orderId = e.orderDetail.orderId;
        this.viewOrderModal = true;
    }

    orderAssignComplete(e) {
        this.assigningOrder = false;
        if (e.action) {
            this.filterSearch();
        }
    }

    supplierSwapComplete(e) {
        if (e.updated) {
            this.filterSearch();
        }
        this.swapSupplier = false;
    }

    
   
    
}
