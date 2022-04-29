import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AlertService} from './alert.service';
import {Store} from '../store';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private alertService: AlertService,
        private store: Store,
    ) {
    }

    path() {
        return 'https://api.ysdev.co.uk/';
        // return 'http://localhost:3000/';
    }

    getHttpOptions() {
        const token = this.store.selectForLocal('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'x-api-key': '1553015152749A58DBD1BABE09729XO102',
                'Authorization': 'Bearer ' + token,
            })
        };
        return httpOptions;
    }

    handleError(error: HttpErrorResponse) {
        // this.alertService.error(['There was a problem']);
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.'
        );
    }

}
