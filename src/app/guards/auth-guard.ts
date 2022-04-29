import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Store} from '../store';
import {CookieService} from '../services/cookie.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private store: Store,
        private router: Router,
        private cookieService: CookieService,
    ) {

    }
    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {

        const res = await this.cookieService.isAuthenticated();
        if (res) {
            return true;
        } else {
            this.router.navigate(['']);
        }
        // return this.cookieService.isAuthenticated()
        //     .then(
        //         (authenticated: boolean) => {
        //             if (authenticated) {
        //                 return true;
        //             } else {
        //                 this.router.navigate(['']);
        //             }
        //         }
        //     );
    }
}
