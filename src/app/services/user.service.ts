import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '../store';
import { CookieService } from './cookie.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ToolsService } from './tools.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    env = environment;

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private store: Store,
        private cookieService: CookieService,
        private toolsService: ToolsService
    ) {
    }

    async postcodeLookup(postcode) {
        const result: any = await this.http
            .get(
                'https://api.getAddress.io/find/' +
                postcode +
                '?api-key=CzqJCvY6GEeVcLJLm0kJWQ28605&expand=true&sort=true'
            )
            .toPromise();
        console.log(result.addresses);
        return result.addresses;
    }

    async createUserNew(user) {
        const dataToSend = {
            user,
            createdBy: this.store.selectForLocal('user'),
        };
        const result: any = await this.http
            .post(
                this.env.apiPath + 'users/new',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .toPromise();
        console.log(result);
        return result.data;
    }

    async createAddressNew(address, user) {
        const dataToSend = {
            address,
            user,
            createdBy: this.store.selectForLocal('user'),
        };
        const result: any = await this.http
            .post(
                this.env.apiPath + 'users/address/new',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .toPromise();

        return result.data;
    }

    async createCompanyNew(company, user) {
        const dataToSend = {
            company,
            user,
            createdBy: this.store.selectForLocal('user'),
        };
        const result: any = await this.http
            .post(
                this.env.apiPath + 'users/company/new',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .toPromise();
        return result.data;
    }

    RegistrationAdditionalDetails(address, company, user) {
        const dataToSend = {
            address,
            company,
            user,
        };
        return this.http.post(this.env.apiPath + 'users/company/additional', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );

    }

    createUser(user) {
        return this.http
            .post(
                this.env.apiPath + 'users/signup',
                user,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    async createUserAsync(user) {
        const result: any = await this.http
            .post(
                this.env.apiPath + 'users/signup',
                user,
                this.apiService.getHttpOptions()
            )
            .toPromise();
        return result.data;
    }

    async checkUserExists(email) {
        const result: any = await this.http
            .get(
                this.env.apiPath + 'users/exists/' + email,
                this.apiService.getHttpOptions()
            )
            .toPromise();
        return result.data;
    }

    checkReferralCode(referralCode, referralEmail) {
        const dataToSend = {
            referralCode,
            referralEmail,
        };
        return this.http
            .post(
                this.env.apiPath + 'users/referralcode/check',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    async createGuest(user) {
        const result: any = await this.http
            .post(
                this.env.apiPath + 'users/signup',
                user,
                this.apiService.getHttpOptions()
            )
            .toPromise();
        return result.data;
    }

    async createAddress(address, createdBy) {
        const dataToSend = {
            address,
            createdBy,
        };
        const result: any = await this.http
            .post(
                this.env.apiPath + 'users/address',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .toPromise();
        return result;
    }

    updatePrimaryUser(companyId, userId) {
        const dataToSend = {
            companyId,
            userId,
        };
        return this.http
            .put(
                this.env.apiPath +
                'users/company/' +
                companyId +
                '/primaryuser',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    createCompany(company, createdBy) {
        const dataToSend = {
            company,
            createdBy,
        };
        return this.http
            .post(
                this.env.apiPath + 'users/company',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    getByToken() {
        console.log(this.env);
        return this.http
            .get(
                this.env.apiPath + 'users/profile',
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    this.store.set('user', data.data);
                    this.cookieService.setUser(data.data);
                    this.toolsService.setSessionId(data.data.id);
                    localStorage.setItem('user', data.data.id);
                    // this.cookieService.set('user', data);
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    update(user) {
        return this.http
            .put(
                this.env.apiPath + 'users/' + user.id,
                user,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map(async (data: any) => {
                    this.store.set('user', user);
                    await this.cookieService.setUser(user);
                    localStorage.setItem('user', user.id);
                    // await this.cookieService.set('user', user);
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    updateContact(user) {
        return this.http
            .put(
                this.env.apiPath + 'users/contact/' + user.id,
                user,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map(async (data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    findAllByCompany(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'users/search/users',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    findOne(id) {
        return this.http
            .get(
                this.env.apiPath + 'users/' + id,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    delete(id) {
        return this.http
            .delete(
                this.env.apiPath + 'users/' + id,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    search() {
        const companyUsers = this.store.selectForLocal('companyUsers');
        const user = this.store.selectForLocal('user');
        companyUsers.params.accountType = user.accountType;
        companyUsers.params.companyId = user.company.id;
        const dataToSend = {
            params: companyUsers.params,
        };
        return this.http
            .post(
                this.env.apiPath + 'users/search',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    companyUsers.data = data.data.data;

                    companyUsers.params.pages = Math.ceil(
                        data.data.totalRecords / companyUsers.params.limit
                    );
                    companyUsers.params.totalRecords = data.data.totalRecords;
                    companyUsers.params.pageArray = [];
                    for (let i = 0; i < companyUsers.params.pages; i++) {
                        companyUsers.params.pageArray.push(i);
                    }
                    this.store.set('companyUsers', companyUsers);

                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    searchCustomers(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'users/search/customers',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    findAddressesByCustomer(userId) {
        return this.http
            .get(
                this.env.apiPath + 'users/addresses/' + userId,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    searchCompanies(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'users/search/companies',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    areasCovered(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'users/search/companies/areascovered',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    getCompanyAreasCovered(companyId) {
        return this.http
            .get(
                this.env.apiPath +
                'users/search/companies/areascovered/' +
                companyId,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    searchSupplierCollectionCosts(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'courier/supplier/collection/',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    updateSupplierCollectionCosts(supplier, courierId) {
        const dataToSend = {
            courierId,
            supplier,
        };

        return this.http
            .put(
                this.env.apiPath + 'courier/supplier/collection',
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
