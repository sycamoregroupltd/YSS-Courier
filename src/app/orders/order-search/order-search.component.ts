import {Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import { debounce } from 'lodash';
import {OrdersService} from '../../services/orders.service';
import {Store} from '../../store';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit, OnChanges {
    @Input() params;
    @Input() user;
    @Input() showCustomer = true;
    @Input() showSupplier = false;

    user$ = this.store.select<any>('user');

    orders = [];

    constructor(
        private ordersService: OrdersService,
        private store: Store,
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.filterSearch();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        if (changes.params) {
            this.filterSearch();
        }
    }

    filterSearch() {
        this.params.page = 0;
        this.search();
    }

    search() {
        this.ordersService.search(this.params).subscribe(data => {
            console.log(data.data);
            this.orders = data.data.data;

            this.params.pages = Math.ceil(data.data.totalRecords / this.params.limit);
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }
        });
    }

}
