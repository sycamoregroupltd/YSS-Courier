import {Component, Input, OnInit} from '@angular/core';
import {CourierService} from '../../services/courier.service';
import {OverlayService} from '../../services/overlay.service';
import {AlertService} from '../../services/alert.service';
import {Store} from '../../store';
import {Router} from '@angular/router';
import {debounce} from 'lodash';

@Component({
  selector: 'app-courier-vehicles-slider',
  templateUrl: './courier-vehicles-slider.component.html',
  styleUrls: ['./courier-vehicles-slider.component.css']
})
export class CourierVehiclesSliderComponent implements OnInit {
    @Input() company;

    overlays$ = this.store.select<any>('overlays');

    items = [];
    itemSelected;

    overlayData;
    overlayDataPermissions;

    confirmationData = {
        open: false,
        title: '',
        detail: '',
        data: undefined
    };
    params = {
        courier: '',
        type: '',
        limit: 5,
        limits: [5, 10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'courier_vehicle.createdAt DESC',
        sorts: [],
    };

    constructor(
        private courierService: CourierService,
        private overlayService: OverlayService,
        private alertService: AlertService,
        private store: Store,
        private router: Router,
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.params.courier = this.company.id;
        this.filterSearch();
    }

    filterSearch() {
        this.params.page = 0;
        this.search();
    }

    search() {
        this.courierService.searchVehicles(this.params).subscribe((data) => {
            this.items = data.data.data;

            this.params.pages = Math.ceil(
                data.data.totalRecords / this.params.limit
            );
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }
            console.log(this.params);
        });
    }

    create() {
        this.overlayData = {
            item: undefined,
            company: this.company,
        };
        this.overlayService.toggle('vehicleEdit');
    }

    edit(item) {
        console.log(item);
        this.overlayData = {
            item,
        };
        this.overlayService.toggle('vehicleEdit');
    }

    confirmDelete(item) {
        this.itemSelected = item;
        this.confirmationData.title = 'Are you sure you want to delete this vehicle?';
        this.confirmationData.data = item;
        this.confirmationData.detail = '';
        this.confirmationData.open = true;
    }

    confirmationComplete(e) {
        this.confirmationData.open = false;
        if (e.action) {
            this.courierService.deleteZone(this.itemSelected).subscribe(data => {
                this.alertService.notification(['Vehicle deleted'], 3000);
                this.filterSearch();
            });
        }
    }




}
