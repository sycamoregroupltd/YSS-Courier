import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { Store } from '../store';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    env = environment;

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private store: Store,
    ) {
    }

    findOne(id) {
        return this.http.get(this.env.apiPath + 'users/company/' + id, this.apiService.getHttpOptions())
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
        return this.http.post(this.env.apiPath + 'users/search/companies', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                )
            );
    }

    setPremium(company) {
        const dataToSend = {
            id: company.id,
            premium: company.premium
        };
        return this.http.put(this.env.apiPath + 'users/company/' + company.id + '/premium', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                )
            );
    }

    update(company) {
        const updatedBy = this.store.selectForLocal('user');
        const dataToSend = {
            company,
            updatedBy,
        };
        return this.http.put(this.env.apiPath + 'users/company/' + company.id, dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map(async (data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                ));
    }

    updateStatus(company, status) {
        const updatedBy = this.store.selectForLocal('user');
        const dataToSend = {
            company,
            status,
            updatedBy,
        };
        return this.http.put(this.env.apiPath + 'users/company/' + company.id + '/status', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map(async (data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                ));
    }

    updatePrimaryUser(companyId, userId) {
        const updatedBy = this.store.selectForLocal('user');
        const dataToSend = {
            companyId,
            userId,
            updatedBy,
        };
        return this.http.put(this.env.apiPath + 'users/company/' + companyId + '/primaryuser', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map(async (data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                ));
    }


    create(company) {
        const createdBy = this.store.selectForLocal('user');
        const dataToSend = {
            company,
            createdBy,
        };
        return this.http.post(this.env.apiPath + 'users/company', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                ));
    }

}
