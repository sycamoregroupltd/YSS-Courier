import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourierService } from '../../services/courier.service';
import { OverlayService } from '../../services/overlay.service';
import { debounce } from 'lodash';
import { PostcodeService } from '../../services/postcode.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-company-area-manage',
    templateUrl: './company-area-manage.component.html',
    styleUrls: ['./company-area-manage.component.scss']
})
export class CompanyAreaManageComponent implements OnInit {
    @Input() overlayData;
    @Input() companyId;
    @Output() refreshData = new EventEmitter();

    existingPostcodes = [];
    postcodes = [];

    params = {
        postcode: '',
        region: '',
        area: '',
        companyId: undefined,
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
        private postcodeService: PostcodeService,
        private userService: UserService,
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.params.companyId = this.companyId;
        this.filterSearch();
    }

    filterSearch() {
        this.params.page = 0;
        this.getExistingPostcodes();
        this.searchPostcodes();
    }

    getExistingPostcodes() {
        this.userService.getCompanyAreasCovered(this.companyId).subscribe(data => {
            this.existingPostcodes = data.data;
        });
    }

    searchPostcodes() {
        this.postcodeService.search(this.params).subscribe((data) => {
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

    addPostcodeByRegion(item) {
        const dataToSend = {
            companyId: this.companyId,
            region: item.region
        };
        this.postcodeService.addPostcodeByRegion(dataToSend).subscribe(data => {
            this.searchPostcodes();
            this.getExistingPostcodes();
        });
    }

    addPostcodeByArray() {
        const postcodes = [];
        for (let i = 0; i < this.postcodes.length; i++) {
            postcodes.push(this.postcodes[i].postcode);
        }
        const dataToSend = {
            companyId: this.companyId,
            postcodes,
        };
        this.postcodeService.addPostcodeByArray(dataToSend).subscribe(data => {
            this.searchPostcodes();
            this.getExistingPostcodes();
        });
    }

    addPostcode(item) {
        const dataToSend = {
            companyId: this.companyId,
            postcode: item.postcode
        };
        this.postcodeService.addPostcode(dataToSend).subscribe(data => {
            this.searchPostcodes();
            this.getExistingPostcodes();
        });
    }

    removePostcode(item) {
        const dataToSend = {
            companyId: this.companyId,
            postcode: item.postcode
        };
        this.postcodeService.removePostcode(dataToSend).subscribe(data => {
            this.searchPostcodes();
            this.getExistingPostcodes();
        });

    }

    close() {
        this.refreshData.emit();
        this.overlayService.closeAll();
    }
}
