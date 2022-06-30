import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorRequestInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            /*.pipe(
                catchError((error) => {
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
                })
            )*/;
    }
}
