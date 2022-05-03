import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '../store';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostcodeService {
    env = environment;

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private store: Store,
    ) {
    }

    search(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'postcode/search',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }


    addPostcode(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'postcode/company/add',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    addPostcodeByRegion(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'postcode/company/add/region',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    addPostcodeByArray(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'postcode/company/add/array',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );

    }

    removePostcode(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'postcode/company/remove',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

}
