import { Inject, Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpInterceptor } from '@angular/common/http';
import { InterceptingHandler } from './InterceptingHandler';
import { AUTH_HTTP_INTERCEPTORS, ERROR_HTTP_INTERCEPTORS } from './Injection.tokens';

// Only Authentication stuff added, no failing errors, no single request/busy loader done here
// purpose for API tasks that is irrelevant for the end-user

@Injectable()
export class AuthHttpClient extends HttpClient {
    constructor(
        backend: HttpBackend,
        @Inject(HTTP_INTERCEPTORS) interceptors: HttpInterceptor[],
        @Inject(ERROR_HTTP_INTERCEPTORS) errorInterceptors: HttpInterceptor[],
        @Inject(AUTH_HTTP_INTERCEPTORS) authInterceptors: HttpInterceptor[],
    ) {
        super(new InterceptingHandler(
            backend,
            // @ts-ignore
            [interceptors, authInterceptors, errorInterceptors].flat()
        ));
    }
}
