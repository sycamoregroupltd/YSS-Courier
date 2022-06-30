import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { finalize, tap } from "rxjs/operators";
import { Store } from '../store';
import { OverlayService } from '../services/overlay.service';

@Injectable()
export class SingleRequestInterceptor implements HttpInterceptor
{
    private routeMap = [];
    private activeRequests = 0;

    constructor(
        private store: Store,
        private overlayService: OverlayService,
    )
    {

    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
    {
        const urlIdent = request.method + request.url;
        const urlSuffix = 'done';
        if (this.routeMap.indexOf(urlIdent) !== -1) {
            return EMPTY;
        }

        this.activeRequests++;

        if (this.activeRequests === 1) {
            setTimeout(() => this.overlayService.open('busyIndicator'));
        }

        this.routeMap.push(urlIdent);

        return next.handle(request)
            .pipe(
                // removing request from the stack before the complete is executed.
                tap(() =>
                {
                    if (this.routeMap.indexOf(urlIdent) !== -1) {
                        this.routeMap.splice(this.routeMap.indexOf(urlIdent), 1);
                        this.routeMap.push(urlIdent + urlSuffix);
                    }
                }),
                // fall back removal from the stack in case of an error
                finalize(() =>
                {
                    if (this.routeMap.indexOf(urlIdent + urlSuffix) !== -1) {
                        this.routeMap.splice(this.routeMap.indexOf(urlIdent + urlSuffix), 1);
                        this.activeRequests--;
                        if (this.activeRequests === 0) {
                            setTimeout(() => this.overlayService.close('busyIndicator'));
                        }
                    }
                })
            );
    }
}
