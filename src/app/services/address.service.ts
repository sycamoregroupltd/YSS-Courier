import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {ApiService} from './api.service';
import {Store} from '../store';
import {catchError, map} from 'rxjs/operators';
import { ApiAuthHttpClient } from '../http/ApiAuthHttpClient';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
    env = environment;

    constructor(
        private apiService: ApiService,
        private http: ApiAuthHttpClient,
        private store: Store,
    ) {
    }

    findOne(id) {
        return this.http.get(this.env.apiPath + 'users/address/' + id, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    findByCustomer(customerId) {
        return this.http.get(this.env.apiPath + 'users/addresses/' + customerId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    search(params) {
        const dataToSend = {
            params,
        };
        return this.http.post(this.env.apiPath + 'users/address/search', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map( (data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }

    update(address) {
        const updatedBy = this.store.selectForLocal('user');
        const dataToSend = {
            address,
            updatedBy,
        };
        return this.http.put(this.env.apiPath + 'users/address/' + address.id, dataToSend , this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    create(address) {
        const createdBy = this.store.selectForLocal('user');
        const dataToSend = {
            address,
            createdBy
        };
        return this.http.post(this.env.apiPath + 'users/address', dataToSend , this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

}
