import { Component, EventEmitter, HostListener, Input, OnInit,Output,Renderer2 } from '@angular/core';
import { Store } from '../../store';
import { ShipmentService } from '../../services/shipment.service';
import { UserService } from '../../services/user.service';
import { OrdersService } from '../../services/orders.service';
import { debounce } from 'lodash';
import { OrderBoardPopupComponent } from '../order-board-popup/order-board-popup.component';
import {PopoverModule} from 'ngx-bootstrap/popover';
import { AvailbleBSPositions } from 'ngx-bootstrap/positioning';
import { OrderAssignComponent } from '../../orders/order-assign/order-assign.component';
import { OrderBoardSwapSupplierComponent } from '../../orders/order-board-swap-supplier/order-board-swap-supplier.component';
import { AddPoNumberComponent } from '../../orders/add-po-number/add-po-number.component';
import { PoNumberAlertData } from "../../orders/add-po-number/add-po-number.component";
import { InvNumberAlertData } from "../../orders/add-inv-number/add-inv-number.component";
import { ToolsService } from 'src/app/services/tools.service';
import { MoveBackModalOutput } from '../../orders/move-back-modal/move-back-modal-output';
import { forkJoin } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import { OrderCancelComponent } from 'src/app/orders/order-cancel/order-cancel.component';

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
    @Input() boardFullscreen = false;
    @Output() showFullscreen = new EventEmitter();
    orderDetailBoard$ = this.store.select<any>('orderDetailBoard');
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
    public showPoNumber = false;
    public showInvNumber=false;
    private _currentCard;
    private lastDetailItem = null;
    addingCourier = false;
    addingDeliveryAddress = false;
    viewingDeliveryInfo = false;
    isSortingAsc = true;
    sortedColumn = '';
    results = [];


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
        private renderer: Renderer2,
        private toolsService: ToolsService,
        private toastrService: ToastrService,
       
     
      
        
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {

        this.getShipments();
        this.getAdmins();
    }

    orderDetailsClicked(event): void {
        
        this.lastDetailItem = [
            event.target,
            event.target.closest('.board-col')
        ];
        if (this.getXYTranslations().y > 350) {
            this.popoverPos = "top";
        } else {
            this.popoverPos = "bottom";
        }

        setTimeout(this.onScroll.bind(this, [true]), 10);
    }

    onScroll(addTransision = false): void {
        if (document.getElementsByTagName('popover-container').length > 0 && this.lastDetailItem) {
            const popover = document.getElementsByTagName('popover-container')[0];
            const popoverRect = popover.getBoundingClientRect();
            const trans = this.getXYTranslations();
            let transform = 'translate3d(' + Math.floor(trans.x - 25) + 'px, ' + Math.floor(trans.y + 24) + 'px, 0)';
            if (this.popoverPos === "top") {
                transform = 'translate3d(' + Math.floor(trans.x - 25) + 'px, ' + Math.floor(trans.y - popoverRect.height - 6) + 'px, 0)';
            }
            this.renderer.setStyle(popover, 'transform', transform);
        }
    }

    private getXYTranslations(): { x: number, y: number } {
        const btnBoundingClientRect = this.lastDetailItem[0].getBoundingClientRect();
        const contBoundingClientRect = this.lastDetailItem[1].getBoundingClientRect();
        const x = (btnBoundingClientRect.x - contBoundingClientRect.x) + btnBoundingClientRect.width;
        const y = (btnBoundingClientRect.y - contBoundingClientRect.y) - Math.round(btnBoundingClientRect.height / 2);
        return { x, y };
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

        console.log('noooooo',e);
       
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
    public showPoNumberModal(poNumberAlertData: PoNumberAlertData) {
        this.showPoNumber = poNumberAlertData.showPoNumberModal;
    }

   

    public savePoNumberModal(poNumberAlertData: PoNumberAlertData) {
        console.log('save',this._currentCard);
        this.showPoNumber = poNumberAlertData.showPoNumberModal;
        this.ordersService
            .setPoNumber({
                poNumber: poNumberAlertData.poNumber,
                orderLineId: this._currentCard.id,
            })
            .pipe()
            .subscribe();

        this._currentCard.poNumber = poNumberAlertData.poNumber;
    }

    public setPoNumber(card) {
        console.log('card3333333',card);
        this._currentCard = card;
    }

    public saveInvNumberModal(invNumberAlertData: InvNumberAlertData) {
        this.showInvNumber = invNumberAlertData.showInvNumberModal;
        this.ordersService
            .setInvNumber({
                invNumber: invNumberAlertData.invNumber,
                orderLineId: this._currentCard.id,
            })
            .pipe()
            .subscribe();
        this._currentCard.invNumber = invNumberAlertData.invNumber;
    }
    public showInvNumberModal(invNumberAlertData: InvNumberAlertData) {
        this.showInvNumber = invNumberAlertData.showInvNumberModal;
        
    }
    toggleAssignedToToolTip(card) {
        card.showAssignedToolTip = !card.showAssignedToolTip;
    }

    toggleCreatedByToolTip(card) {
        card.showCreatedByToolTip = !card.showCreatedByToolTip;
    }
    toggleIsPaidToolTip(card) {
        card.showIsPaidToolTip = !card.showIsPaidToolTip;
    }

    addCourier(card) {
        this.addingCourier = true;
        this.orderDetail = card;
    }

    addDeliveryAddress(card) {
        this.addingDeliveryAddress = true;
        this.orderDetail = card;
    }
    viewDeliveryInfo(card) {
        this.viewingDeliveryInfo = true;
        this.orderDetail = card;
    }
    public daysToDate(date: string): number {
        return date && this.toolsService.datediff(Date.now(), new Date(date).getTime());
    }

    toggleUpdateRequestToolTip(card) {
        card.showUpdateRequestToolTip = !card.showUpdateRequestToolTip;
    }

    
    onToggleSort(results, c, column: string, columnIcon: string) {
        if (this.sortedColumn === columnIcon || this.sortedColumn === '') {
            this.isSortingAsc = !this.isSortingAsc;
        } else {
            this.isSortingAsc = false;
        }
        this.sortedColumn = columnIcon;
        this.results = this.sort(results, column, this.isSortingAsc ? 'asc' : '');
        const orderDetailBoard = this.store.selectForLocal('orderDetailBoard');
        for (var i = 0; i < orderDetailBoard.groups.length; i++) {
            if (orderDetailBoard.groups[i].id == c.groupId) {
                for (var j = 0; j < orderDetailBoard.groups[i].cols.length; j++) {
                    if (orderDetailBoard.groups[i].cols[j].adminText == c.adminText) {
                        orderDetailBoard.groups[i].cols[j].orderLines = this.results;
                    }
                }

            }
        }
        this.store.set('orderDetailBoard', orderDetailBoard);
    }

    sortAscending() {
        const orderDetailBoard = this.store.selectForLocal('orderDetailBoard');
        for (var i = 0; i < orderDetailBoard.groups.length; i++) {
            for (var j = 0; j < orderDetailBoard.groups[i].cols.length; j++) {
                this.results = this.sort(orderDetailBoard.groups[i].cols[j].orderLines, 'publicId', 'asc');
                orderDetailBoard.groups[i].cols[j].orderLines = this.results;
            }
        }
        this.store.set('orderDetailBoard', orderDetailBoard);
    }

    compare(v1: string | number, v2: string | number) {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }

    sort(results, column: string, direction: string) {
        return [...results].sort((a, b) => {
            let res;
            if (column.indexOf('.') !== -1) {
                res = this.compare(this.accessValueByString(column, a), this.accessValueByString(column, b));
            } else {
                res = this.compare(a[column], b[column]);
            }
            return direction === 'asc' ? res : -res;
        });
    }

    accessValueByString(valueString, object) {
        return valueString.split('.').reduce((o, i) => o[i], object);
    }
    closeFullScreen() {
        this.showFullscreen.emit(false);
    }

    public backConfirmCompleted({ confirmed, newStatus }: MoveBackModalOutput): void {
        const { card } = this.backConfirmModal;
        this.backConfirmModal.show = false;
        if (confirmed) {
            // merge the new status with card data to send so we won't change the original card for if the request fails
            const newCard = { ...card, status: newStatus };
            let source$ = this.ordersService.updateOrderLineStatus(newCard);
            if (newStatus.group.id === 1 && newStatus.id === 1) {
                // if selected new status is Unassigned
                const dataToSend = {
                    orderDetail: newCard,
                    orderId: newCard.orderId,
                    orderDetailId: newCard.id,
                    userId: '',
                    moveToConfirmation: false,
                };
                source$ = forkJoin([source$, this.ordersService.assignUser(dataToSend)])
            }
            source$.subscribe(() => {
                this.toastrService.success(`Order line ${card.publicId}/${card.lineId} moved back`);
                this.filterSearch();
            });
        }
    }

    orderModalComplete(e) {
        if (e.updated) {

        }
        this.viewOrderModal = false;
    }

   


    
   
    
}
