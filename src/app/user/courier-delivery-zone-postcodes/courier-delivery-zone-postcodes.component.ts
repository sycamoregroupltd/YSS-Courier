import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CourierService} from '../../services/courier.service';
import {OverlayService} from '../../services/overlay.service';
import {debounce} from 'lodash';

@Component({
  selector: 'app-courier-delivery-zone-postcodes',
  templateUrl: './courier-delivery-zone-postcodes.component.html',
  styleUrls: ['./courier-delivery-zone-postcodes.component.css']
})
export class CourierDeliveryZonePostcodesComponent implements OnInit {
    @Input() overlayData;
    @Output() refreshData = new EventEmitter();

    zoneId = '';
    courierId = '';
    vehicleType = '';
    zonePostcodes = [];
    postcodes = [];

    params = {
        postcode: '',
        region: '',
        area: '',
        zone: 0,
        courier: '',
        vehicleType: '',
        limit: 25,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'postcodes.postcode',
        sorts: [],
    };

    constructor(
        private courierService: CourierService,
        private overlayService: OverlayService,
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.zoneId = this.overlayData.item.id;
        this.courierId = this.overlayData.companyId;
        this.vehicleType = this.overlayData.vehicleType;
        this.params.vehicleType = this.overlayData.vehicleType;
        this.params.zone = this.overlayData.item.id;
        this.params.courier = this.overlayData.companyId;

        this.filterSearch();
        this.getZonePostcodes();
    }

    filterSearch() {
        this.params.page = 0;
        this.searchPostcodes();
    }

    searchPostcodes() {
        this.courierService.search(this.params).subscribe((data) => {
            this.postcodes = data.data.data;

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

    getZonePostcodes() {
        const zoneParams = {
            courierId: this.courierId,
            vehicleType: this.vehicleType,
            zoneId: this.zoneId,
        };
        this.courierService.searchZonePostcodes(zoneParams).subscribe(data => {
            this.zonePostcodes = data.data.data;
        });
    }

    addPostcodeToZoneByRegion(item) {
        const dataToSend = {
            courierId: this.courierId,
            vehicleType: this.vehicleType,
            zoneId: this.zoneId,
            region: item.region
        };
        this.courierService.addPostcodeToZoneByRegion(dataToSend).subscribe(data => {
            this.getZonePostcodes();
            this.searchPostcodes();
        });
    }

    addPostcodeToZoneByArray() {
        const postcodes = [];
        for (let i = 0; i < this.postcodes.length; i++) {
            postcodes.push(this.postcodes[i].postcode);
        }
        const dataToSend = {
            courierId: this.courierId,
            vehicleType: this.vehicleType,
            zoneId: this.zoneId,
            postcodes,
        };
        this.courierService.addPostcodeToZoneByArray(dataToSend).subscribe(data => {
            this.getZonePostcodes();
            this.searchPostcodes();
        });
    }

    addPostcodeToZone(item) {
        const dataToSend = {
            courierId: this.courierId,
            vehicleType: this.vehicleType,
            zoneId: this.zoneId,
            postcode: item.postcode
        };
        this.courierService.addPostcodeToZone(dataToSend).subscribe(data => {
            this.getZonePostcodes();
            this.searchPostcodes();
        });
    }

    removePostcodeFromZone(item) {
        const dataToSend = {
            courierId: this.courierId,
            vehicleType: this.vehicleType,
            zoneId: this.zoneId,
            postcode: item.postcode
        };
        this.courierService.removePostcodeFromZone(dataToSend).subscribe(data => {
            this.getZonePostcodes();
            this.searchPostcodes();
        });

    }


    close() {
        this.refreshData.emit();
        this.overlayService.closeAll();
    }


}
