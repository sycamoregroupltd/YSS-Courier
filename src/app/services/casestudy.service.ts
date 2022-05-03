import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '../store';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CasestudyService {
    env = environment;

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private store: Store,
    ) {
    }

    get(id) {
        return this.http.get(this.env.apiPath + 'case-study/' + id, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    homepagePromo() {
        return this.http.get(this.env.apiPath + 'case-study/promo', this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    search(params) {
        const dataToSend = {
            params,
        };
        return this.http.post(this.env.apiPath + 'case-study/search', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    create(caseStudy) {
        const user = this.store.selectForLocal('user');
        const dataToSend = {
            caseStudy,
            user,
        };
        return this.http.post(this.env.apiPath + 'case-study', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    update(caseStudy) {
        const user = this.store.selectForLocal('user');
        const dataToSend = {
            caseStudy,
            user,
        };
        return this.http.put(this.env.apiPath + 'case-study', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

}
