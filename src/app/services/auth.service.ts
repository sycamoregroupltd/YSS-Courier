import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Store } from '../store';
import { ApiAuthHttpClient } from '../http/ApiAuthHttpClient';
import { CookieService } from './cookie.service';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import { BasketService } from './basket.service';
import { ToolsService } from './tools.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    env = environment;

    authInterval;

    constructor(
        private apiService: ApiService,
        private http: ApiAuthHttpClient,
        private store: Store,
        private cookieService: CookieService,
        private userService: UserService,
        private basketService: BasketService,
        private toolsService: ToolsService,
    ) {
    }

    getTmpSessionId() {
        const sessionId = localStorage.getItem('sessionIdTmp');
        if (!sessionId) {
            const newSessionId = this.toolsService.newUUID();
            localStorage.setItem('sessionIdTmp', this.toolsService.newUUID());
            return newSessionId;
        } else {
            return sessionId;
        }
    }

    login(user) {
        return this.http
            .post(
                this.env.apiPath + 'users/login/courier',
                user,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map(async (data: any) => {
                    this.store.set('token', data.data.token);
                    this.store.set('loggedIn', true);
                    await this.cookieService.setToken(
                        data.data.token,
                        user.extendedExpiration
                    );
                    await this.cookieService.setUser(user);

                    this.toolsService.setSessionId(user.id);

                    localStorage.setItem('user', user.id);

                    this.basketService.setGuest(false);
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    logout() {
        this.basketService.clearUserFromBasket();
        this.toolsService.logoutSessionId();
        this.cookieService.remove();
    }

    passwordReset(email) {
        const dataToSend = {
            email,
        };
        return this.http
            .post(
                this.env.apiPath + 'users/password/reset',
                dataToSend,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    passwordSet(resetData) {
        return this.http
            .post(
                this.env.apiPath + 'users/password/set',
                resetData,
                this.apiService.getHttpOptions()
            )
            .pipe(
                map(async (data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );
    }

    authTimeout() {
        this.authInterval = setInterval(() => {
            let ttl = this.store.selectForLocal('ttl');
            ttl--;
            this.store.set('ttl', ttl);
            if (ttl === 0) {
                this.logout();
            }
        }, 50000);
    }

    resetAuthTimeout() {
        this.store.set('ttl', 1000); // reset to 10
    }

    clearAuthTimeout() {
        clearInterval(this.authInterval);
    }
}
