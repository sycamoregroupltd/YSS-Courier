import { Inject, Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpInterceptor } from '@angular/common/http';
import { InterceptingHandler } from './InterceptingHandler';
import { ERROR_HTTP_INTERCEPTORS, SINGLE_HTTP_INTERCEPTORS } from './Injection.tokens';

@Injectable()
export class ApiHttpClient extends HttpClient {
    constructor(
        backend: HttpBackend,
        @Inject(HTTP_INTERCEPTORS) interceptors: HttpInterceptor[],
        @Inject(SINGLE_HTTP_INTERCEPTORS) singleInterceptors: HttpInterceptor[],
        @Inject(ERROR_HTTP_INTERCEPTORS) errorInterceptors: HttpInterceptor[]
    ) {
        super(new InterceptingHandler(
            backend,
            // @ts-ignore
            [interceptors, singleInterceptors, errorInterceptors].flat()
        ));
    }
}
