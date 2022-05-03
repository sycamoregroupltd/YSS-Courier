import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';
import { PostcodeService } from '../../services/postcode.service';
import { debounce } from 'lodash';
import { UserService } from '../../services/user.service';
import { OverlayService } from '../../services/overlay.service';

@Component({
    selector: 'app-areas-covered',
    templateUrl: './areas-covered.component.html',
    styleUrls: ['./areas-covered.component.scss']
})
export class AreasCoveredComponent implements OnInit {
    user$ = this.store.select<any>('user');
    user = this.store.selectForLocal('user');
    overlays$ = this.store.select<any>('overlays');

    items = [];

    params = {
        companyId: '',
        postcode: '',
        area: '',
        region: '',
        limit: 50,
        limits: [25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'company_area_index.postcode',
        sorts: [],
    };

    constructor(
        private store: Store,
        private postcodeService: PostcodeService,
        private userService: UserService,
        private overlayService: OverlayService,
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.params.companyId = this.user.company.id;
        this.filterSearch();
    }

    filterSearch() {
        this.params.page = 0;
        this.search();
    }

    search() {
        this.userService.areasCovered(this.params).subscribe(data => {
            this.items = data.data.data;

            this.params.pages = Math.ceil(data.data.totalRecords / this.params.limit);
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }
        });
    }

    managePostcodes() {
        this.overlayService.toggle('companyPostcodes');
    }

    removePostcode(postcode) {
        const dataToSend = {
            companyId: this.user.company.id,
            postcode
        };
        this.postcodeService.removePostcode(dataToSend).subscribe(data => {
            this.search();
        });
    }
}
