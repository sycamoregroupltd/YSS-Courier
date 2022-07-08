import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ApiAuthHttpClient } from '../http/ApiAuthHttpClient';
import { environment } from '../../environments/environment';
import { Store } from '../store';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    env = environment;

    constructor(
        private apiService: ApiService,
        private http: ApiAuthHttpClient,
        private store: Store,
    ) {
    }

    getOrder(id) {
        return this.http.get(this.env.apiPath + 'orders/' + id, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getOrderLineStatuses() {
        return this.http.get(this.env.apiPath + 'orders/line/statuses', this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }

    update(order) {
        const dataToSend = {
            order,
        };
        return this.http.put(this.env.apiPath + 'orders/update', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }

    updateStatus(order) {
        const user = this.store.selectForLocal('user');
        const dataToSend = {
            order,
            user,
        };
        return this.http.put(this.env.apiPath + 'orders/update/status', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }

    search(params) {
        const dataToSend = {
            params,
        };
        return this.http.post(this.env.apiPath + 'orders/search', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }

    searchOrderDetails(params) {
        const dataToSend = {
            params,
        };
        return this.http.post(this.env.apiPath + 'orders/search/orderdetails', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }

    assignUser(data) {
        const dataToSend = {
            data
        }
        return this.http.post(this.env.apiPath + 'orders/orderdetail/assign', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                )
            );
    }

    updateSupplier(orderDetail) {
        const dataToSend = {
            orderDetail,
        };
        return this.http.put(this.env.apiPath + 'orders/update/supplier', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                )
            );
    }

    public setPoNumber(card) {
        return this.http
            .put(
                this.env.apiPath + "orders/line/po",
               card,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: HttpErrorResponse) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    public setInvNumber(card) {
        return this.http
            .put(
                this.env.apiPath + "orders/line/inv",
               card,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: HttpErrorResponse) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }
    

    
    updateOrderLineStatus(orderLine) {
        const dataToSend = {
            orderLine,
            user: this.store.selectForLocal('user'),
        };
        return this.http.put(this.env.apiPath + 'orders/line/status', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                )
            );
    }

    findOne(id) {
        return this.http.get(this.env.apiPath + 'orders/' + id, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                )
            );
    }
    updateAddress(orderId, address, type) {
        const dataToSend = {
            orderId,
            address,
            type,
        };
        return this.http.put(this.env.apiPath + 'orders/address', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                )
            );
    }


    
    updateDeliveryInstructions(data) {
        return this.http.put(this.env.apiPath + 'orders/update/deliveryinstructions', data, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                },
                    catchError(this.apiService.handleError)
                )
            );

    }
    


}
