import { InjectionToken } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

export const AUTH_HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>(
    'An abstraction on API HttpInterceptor[]'
);

export const ERROR_HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>(
    'An abstraction on API HttpInterceptor[]'
);

export const SINGLE_HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>(
    'An abstraction on API HttpInterceptor[]'
);
