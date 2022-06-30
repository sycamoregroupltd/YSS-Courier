import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { ApiAuthHttpClient } from '../http/ApiAuthHttpClient';
import { Store } from '../store';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CourierService {
    env = environment;

    constructor(
        private apiService: ApiService,
        private http: ApiAuthHttpClient,
        private store: Store,
    ) {
    }

    calculateDeliveryCosts(basket) {
        const dataToSend = {
            basket,
        };

        return this.http.post(this.env.apiPath + 'courier/delivery/costs', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }


    get(postcode) {
        return this.http
            .get(
                this.env.apiPath + 'courier/postcode/' + postcode,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    delete(postcode) {
        return this.http
            .delete(
                this.env.apiPath + 'courier/postcode/' + postcode.postcode,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    update(postcode) {
        return this.http
            .put(
                this.env.apiPath + 'courier/postcode/' + postcode.postcode,
                postcode,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map(async (data: any) => {
                    // this.store.set('user', user);
                    // await this.storageService.setUser(user);

                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    create(postcode) {
        return this.http
            .post(
                this.env.apiPath + 'courier/postcode',
                postcode,
                this.apiService.getHttpOptions()
            )
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
        return this.http
            .post(
                this.env.apiPath + 'courier/postcode/search',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    updateZone(zone) {
        return this.http
            .put(
                this.env.apiPath + 'courier/postcode/zones/' + zone.id,
                zone,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map(async (data: any) => {
                    // this.store.set('user', user);
                    // await this.storageService.setUser(user);

                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    createZone(zone) {
        return this.http
            .post(
                this.env.apiPath + 'courier/postcode/zones',
                zone,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }


    searchZones(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'courier/postcode/zones/search',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    getZone(zone) {
        return this.http
            .get(
                this.env.apiPath + 'courier/postcode/zones/' + zone,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    deleteZone(zone) {
        return this.http
            .delete(
                this.env.apiPath + 'courier/postcode/zones/' + zone.id,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }


    searchZonePostcodes(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'courier/postcode/zone/postcode/search',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    addPostcodeToZone(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'courier/postcode/zone/postcode/add',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    addPostcodeToZoneByRegion(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'courier/postcode/zone/postcode/add/region',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    addPostcodeToZoneByArray(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'courier/postcode/zone/postcode/add/array',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );

    }

    removePostcodeFromZone(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'courier/postcode/zone/postcode/remove',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }


    updateVehicle(vehicle) {
        return this.http
            .put(
                this.env.apiPath + 'courier/vehicles/' + vehicle.id,
                vehicle,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map(async (data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    createVehicle(vehicle) {
        return this.http
            .post(
                this.env.apiPath + 'courier/vehicles',
                vehicle,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }


    searchVehicles(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'courier/vehicles/search',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    getVehicle(vehicleId) {
        return this.http
            .get(
                this.env.apiPath + 'courier/vehicle/' + vehicleId,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    getVehicleTypes() {
        return this.http
            .get(
                this.env.apiPath + 'courier/vehicletypes',
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    getPricingTypes() {
        return this.http
            .get(
                this.env.apiPath + 'courier/pricingtypes',
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    searchSupplierCouriers(params) {
        const dataToSend = {
            params,
        };
        return this.http
            .post(
                this.env.apiPath + 'courier/supplier/linked',
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
