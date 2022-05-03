import { Component, Input, OnInit } from '@angular/core';
import { debounce } from 'lodash';
import { PaymentsService } from '../../services/payments.service';

@Component({
    selector: 'app-payment-search',
    templateUrl: './payment-search.component.html',
    styleUrls: ['./payment-search.component.scss']
})
export class PaymentSearchComponent implements OnInit {
    @Input() params;

    items = [];

    constructor(
        private paymentsService: PaymentsService,
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.filterSearch();
    }

    filterSearch() {
        this.params.page = 0;
        this.search();
    }

    search() {
        this.paymentsService.search(this.params).subscribe(data => {
            this.items = data.data.data;

            this.params.pages = Math.ceil(data.data.totalRecords / this.params.limit);
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }
        });
    }
}
