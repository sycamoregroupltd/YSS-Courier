import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';
import { Store } from '../../../store';
import { RequestsService } from '../../../services/requests.service';
import { AlertService } from '../../../services/alert.service';
import { OverlayService } from '../../../services/overlay.service';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
    overlays$ = this.store.select<any>('overlays');
    user$ = this.store.select<any>('user');
    companyRequests$ = this.store.select<any[]>('companyRequests');
    overlayDataRequest;
    params;

    constructor(
        private store: Store,
        private requestsService: RequestsService,
        private alertService: AlertService,
        private overlayService: OverlayService,
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.params = this.requestsService.params;
        const user = this.store.selectForLocal('user');
        this.params.companyId = user.company.id;
        this.filterSearch();
    }

    filterSearch() {
        this.params.page = 0;
        this.requestsService.search().subscribe(data => {
            // this.items = data.data.data;

            this.params.pages = Math.ceil(data.data.totalRecords / this.params.limit);
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }

        });
    }

    requestCreate() {
        this.overlayDataRequest = {
            id: '',
            companyId: '',
            createdBy: '',
            type: 0,
            message: '',
        };

        this.store.set('overlayData', this.overlayDataRequest);
        this.overlayService.toggle('requestCreate');

    }
}
