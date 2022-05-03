import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-courier-supplier-collection',
    templateUrl: './courier-supplier-collection.component.html',
    styleUrls: ['./courier-supplier-collection.component.scss']
})
export class CourierSupplierCollectionComponent implements OnInit {
    @Input() company;

    suppliers = [];
    suppliersCopy = [];
    vehicleTypes = [];

    params = {
        courierId: '',
        company: '',
        limit: 5,
        limits: [5, 10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'companies.name',
        sorts: [],
    };

    constructor(
        private userService: UserService,
        private toastrService: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.params.courierId = this.company.id;
        this.get();
    }

    get() {
        this.userService.searchSupplierCollectionCosts(this.params).subscribe(data => {
            this.vehicleTypes = [];
            this.suppliers = data.data.data;
            this.suppliersCopy = JSON.parse(JSON.stringify(data.data.data));
            const objKeys = Object.keys(data.data.data[0].vehicles);
            for (let i = 0; i < objKeys.length; i++) {
                this.vehicleTypes.push(data.data.data[0].vehicles[objKeys[i]]);
            }

            this.params.pages = Math.ceil(
                data.data.totalRecords / this.params.limit
            );
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }


            console.log(this.vehicleTypes);
        });

    }

    hasChanged(supplier, idx) {
        if (JSON.stringify(supplier) !== JSON.stringify(this.suppliersCopy[idx])) {
            return true;
        }
        return false;
    }

    toggleVehicleType(supplier, vehicle) {
        if (supplier.vehicles[vehicle.slug].allowed) {
            supplier.vehicles[vehicle.slug].allowed = false;
        } else {
            supplier.vehicles[vehicle.slug].allowed = true;
        }
    }

    save(supplier, idx) {
        this.userService.updateSupplierCollectionCosts(supplier, this.company.id).subscribe(data => {
            this.toastrService.success('Collection costs updated');
            this.suppliersCopy[idx] = JSON.parse(JSON.stringify(supplier));
        });
    }
}
