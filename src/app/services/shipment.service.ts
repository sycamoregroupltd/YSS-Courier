import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Store } from '../store';

@Injectable({
    providedIn: 'root'
})
export class ShipmentService {
    env = environment;

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private store: Store,
    ) {
    }

    get(id) {
        return this.http.get(this.env.apiPath + 'shipments/' + id, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getByOrderId(orderId) {
        return this.http.get(this.env.apiPath + 'shipments/order/' + orderId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getStatuses() {
        return this.http.get(this.env.apiPath + 'shipments/statuses', this.apiService.getHttpOptions())
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
        return this.http.post(this.env.apiPath + 'shipments/search', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }

    shipmentsBoard(params) {
        const dataToSend = {
            params,
        };
        return this.http.post(this.env.apiPath + 'shipments/board', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        this.store.set('shipmentsBoard', data.data);
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }

    assignVehicle(vehicleId, shipmentId) {
        const dataToSend = {
            vehicleId,
            shipmentId,
        };
        return this.http.post(this.env.apiPath + 'shipments/vehicle/assign', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );

    }


    setStatus(status, shipmentId) {
        const dataToSend = {
            status,
            shipmentId,
        };
        return this.http.put(this.env.apiPath + 'shipments/status', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );

    }

    setShippingDate(shipment) {
        const dataToSend = {
            shipment,
        };
        return this.http.put(this.env.apiPath + 'shipments/deliveryDate', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }

    setCollectionDate(shipment) {
        const dataToSend = {
            shipment,
        };
        return this.http.put(this.env.apiPath + 'shipments/collectionDate', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }
}
