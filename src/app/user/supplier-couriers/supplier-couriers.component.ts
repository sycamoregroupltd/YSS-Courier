import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {debounce} from 'lodash';
import {Store} from '../../store';
import {CourierService} from '../../services/courier.service';

@Component({
    selector: 'app-supplier-couriers',
    templateUrl: './supplier-couriers.component.html',
    styleUrls: ['./supplier-couriers.component.css']
})
export class SupplierCouriersComponent implements OnInit {

    couriers = [];
    user$ = this.store.select<any>('user');

    params = {
        supplierId: '',
        name: '',
        town: '',
        postcode: '',
        status: '',
        freeText: '',
        limit: 10,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'companies.name',
        sorts: [],
    };

    constructor(
        private userService: UserService,
        private courierService: CourierService,
        private store: Store,
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.filterSearch();
    }

    filterSearch() {
        this.params.pages = 0;
        this.search();
    }

    search() {
        const user = this.store.selectForLocal('user');
        this.params.supplierId = user.company.id;
        this.courierService.searchSupplierCouriers(this.params).subscribe(data => {
            this.couriers = data.data.data;
        });
    }


}
