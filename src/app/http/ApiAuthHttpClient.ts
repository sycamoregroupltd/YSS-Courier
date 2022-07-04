import { Inject, Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpBackend, HttpInterceptor } from '@angular/common/http';
import { AUTH_HTTP_INTERCEPTORS, ERROR_HTTP_INTERCEPTORS, SINGLE_HTTP_INTERCEPTORS } from './Injection.tokens';
import { ApiHttpClient } from './ApiHttpClient';

@Injectable()
export class ApiAuthHttpClient extends ApiHttpClient {
    constructor(
        backend: HttpBackend,
        @Inject(HTTP_INTERCEPTORS) interceptors: HttpInterceptor[],
        @Inject(SINGLE_HTTP_INTERCEPTORS) singleInterceptors: HttpInterceptor[],
        @Inject(ERROR_HTTP_INTERCEPTORS) errorInterceptors: HttpInterceptor[],
        @Inject(AUTH_HTTP_INTERCEPTORS) authInterceptors: HttpInterceptor[],
    ) {
        // @ts-ignore
        super(backend, [interceptors, authInterceptors].flat(), singleInterceptors, errorInterceptors);
    }
}
