import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../store';

@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {

    constructor(private store: Store) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.store.selectForLocal('token');
        const apiKey = '6bf9284a-ebf9-4afa-a185-4d2b9bb29e85';

        let headers = request.headers;

        headers = headers.set('domain', 'ys');
        headers = headers.set('api-key', apiKey);
        headers = headers.set('Authorization', `Bearer ${token}`);

        if (!headers.get('Content-Type')) {
            headers = headers.set('Content-Type', 'application/json');
        }

        const authReq = request.clone({ headers });

        return next.handle(authReq);
    }
}
