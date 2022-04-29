import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Store} from '../store';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
    env = environment;

    params = {
        companyId: '',
        message: '',
        type: undefined,
        status: '',
        limit: 15,
        limits: [15, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'company_requests.createdAt DESC',
        sorts: [],
    };

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private store: Store,
    ) {
    }

    create(requestData) {
        const dataToSend = {
            requestData,
        };

        return this.http.post(this.env.apiPath + 'company-request', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
        }

    update(requestData) {
        const dataToSend = {
            requestData,
        };

        return this.http.put(this.env.apiPath + 'company-request', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    get(requestId) {
        return this.http.get(this.env.apiPath + 'company-request/' + requestId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    requestTypes() {
        return this.http.get(this.env.apiPath + 'company-request/types', this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    search() {
        const dataToSend = {
            params: this.params,
        };
        return this.http.post(this.env.apiPath + 'company-request/search', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map( (data: any) => {
                        this.store.set('companyRequests', data.data.data);
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }
}
