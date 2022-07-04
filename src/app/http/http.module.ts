import { NgModule } from '@angular/core';
import { SingleRequestInterceptor } from './single-request.interceptor';
import { AUTH_HTTP_INTERCEPTORS, ERROR_HTTP_INTERCEPTORS, SINGLE_HTTP_INTERCEPTORS } from './Injection.tokens';
import { AuthRequestInterceptor } from './auth-request.interceptor';
import { ErrorRequestInterceptor } from './error-request.interceptor';
import { ApiHttpClient } from './ApiHttpClient';
import { AuthHttpClient } from './AuthHttpClient';
import { ApiAuthHttpClient } from './ApiAuthHttpClient';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        SingleRequestInterceptor,
        AuthRequestInterceptor,
        ErrorRequestInterceptor,
        {
            provide: SINGLE_HTTP_INTERCEPTORS,
            useClass: SingleRequestInterceptor,
            multi: true,
        },
        {
            provide: AUTH_HTTP_INTERCEPTORS,
            useClass: AuthRequestInterceptor,
            multi: true,
        },
        {
            provide: ERROR_HTTP_INTERCEPTORS,
            useClass: ErrorRequestInterceptor,
            multi: true,
        },
        ApiHttpClient,
        AuthHttpClient,
        ApiAuthHttpClient
    ],
    exports: []
})
export class HttpModule {
    constructor() {
    }
}
