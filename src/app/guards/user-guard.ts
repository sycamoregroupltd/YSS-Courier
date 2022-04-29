import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Store} from '../store';
import {CookieService} from '../services/cookie.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {

    constructor(
        private store: Store,
        private router: Router,
        private cookieService: CookieService,
    ) {

    }
    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {

        const res = await this.cookieService.hasUserData();
        if (res) {
            return true;
        } else {
            this.router.navigate(['']);
        }
    }
}
