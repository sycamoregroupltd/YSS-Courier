import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '../../store';
import { ShipmentService } from '../../services/shipment.service';
import { UserService } from '../../services/user.service';
import { OrdersService } from '../../services/orders.service';
import { debounce } from 'lodash';
import { OrderBoardPopupComponent } from '../order-board-popup/order-board-popup.component';

@Component({
    selector: 'app-shipments-board',
    templateUrl: './shipments-board.component.html',
    styleUrls: ['./shipments-board.component.scss']
})
export class ShipmentsBoardComponent implements OnInit {

    user$ = this.store.select<any>('user');
    shipmentsBoard$ = this.store.select<any>('shipmentsBoard');

    updateRequested = false;
    shipment;

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
        // this.userService.getAdmins().subscribe(data => {
        //     this.admins = data.data;
        // })
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
}
