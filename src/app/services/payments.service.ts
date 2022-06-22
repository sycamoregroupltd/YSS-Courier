import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '../store';
import { CookieService } from './cookie.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {
    env = environment;

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private store: Store,
        private cookieService: CookieService,
    ) {
    }

    intentCreate(intent) {
        const dataToSend = {
            intent,
        };

        return this.http.post(this.env.apiPath + 'payments/intent', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    intentUpdate(intent) {
        const dataToSend = {
            intent,
        };

        return this.http.put(this.env.apiPath + 'payments/intent', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

   

    cards(userId) {
        return this.http.get(this.env.apiPath + 'payments/cards/' + userId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    card(id) {

        return this.http.get(this.env.apiPath + 'payments/card/' + id, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }


    tokenCreate(card) {
        const dataToSend = {
            card,
        };

        return this.http.post(this.env.apiPath + 'payments/token', dataToSend, this.apiService.getHttpOptions())
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
        return this.http.post(this.env.apiPath + 'payments', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }
}
