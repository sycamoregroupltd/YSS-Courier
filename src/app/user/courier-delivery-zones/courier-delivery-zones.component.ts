import { Component, OnInit, Input } from '@angular/core';
import { CourierService } from '../../services/courier.service';
import { OverlayService } from '../../services/overlay.service';
import { AlertService } from '../../services/alert.service';
import { Store } from '../../store';
import { Router } from '@angular/router';
import { debounce } from 'lodash';

@Component({
    selector: 'app-courier-delivery-zones',
    templateUrl: './courier-delivery-zones.component.html',
    styleUrls: ['./courier-delivery-zones.component.scss']
})
export class CourierDeliveryZonesComponent implements OnInit {
    @Input() company;

    overlays$ = this.store.select<any>('overlays');
    vehicleTypes = [];
    vehicleType;

    items = [];
    itemSelected;

    overlayData;

    confirmationData = {
        open: false,
        title: '',
        detail: '',
        data: undefined
    };
    params = {
        companyId: '',
        postcode: '',
        region: '',
        area: '',
        vehicleType: '',
        limit: 25,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'postcode_zones.id',
        sorts: [],
    };

    constructor(
        private courierService: CourierService,
        private overlayService: OverlayService,
        private store: Store,
        private alertService: AlertService,
        private router: Router,
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.params.companyId = this.company.id;
        this.getVehicleTypes();
    }

    getVehicleTypes() {
        this.courierService.getVehicleTypes().subscribe(data => {
            this.vehicleTypes = data.data;
            this.selectVehicleType(0);
        });
    }

    selectVehicleType(idx) {
        this.vehicleType = this.vehicleTypes[idx];
        this.params.vehicleType = this.vehicleType.id;
        this.search();
    }

    filterSearch() {
        this.params.page = 0;
        this.search();
    }

    search() {
        this.courierService.searchZones(this.params).subscribe((data) => {
            this.items = data.data.data;

            this.params.pages = Math.ceil(
                data.data.totalRecords / this.params.limit
            );
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }
        });
    }

    create() {
        this.overlayData = {
            item: undefined,
            vehicleType: this.vehicleType.id,
            company: this.company,
        };
        this.overlayService.toggle('postcodeZoneEdit');
    }

    edit(item) {
        this.overlayData = {
            item,
        };
        this.overlayService.toggle('postcodeZoneEdit');
    }

    confirmDelete(item) {
        this.itemSelected = item;
        this.confirmationData.title = 'Are you sure you want to delete this zone?';
        this.confirmationData.data = item;
        this.confirmationData.detail = '';
        this.confirmationData.open = true;
    }

    confirmationComplete(e) {
        this.confirmationData.open = false;
        if (e.action) {
            this.courierService.deleteZone(this.itemSelected).subscribe(data => {
                this.alertService.notification(['Zone deleted'], 3000);
                this.filterSearch();
            });
        }
    }

    managePostcodes(item) {
        this.overlayData = {
            item,
            vehicleType: this.vehicleType.id,
            companyId: this.params.companyId
        };
        this.overlayService.toggle('zonePostcodes');
    }
}
