import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Store } from '../store';
import { ApiAuthHttpClient } from '../http/ApiAuthHttpClient';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FaqService {
    env = environment;

    constructor(
        private apiService: ApiService,
        private store: Store,
        private http: ApiAuthHttpClient,
    ) {
    }

    findAllTopics(params) {
        const dataToSend = {
            params,
        };
        return this.http.post(this.env.apiPath + 'faq/search', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    findOneBySlug(slug) {
        return this.http.get(this.env.apiPath + 'faq/slug/' + slug, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));

    }

    popularQuestions() {
        return this.http.get(this.env.apiPath + 'faq/questions/popular', this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));

    }

}
