import { Injectable } from '@angular/core';
import { Store } from '../store';
import * as Cookies from 'cookies-js';
import { ToolsService } from './tools.service';

@Injectable({
    providedIn: 'root'
})
export class CookieService {
    private static readonly LOGIN_COOKIE = 'yscLogin';
    private static readonly USER_COOKIE = 'yscUser';
    private static readonly BASKET_COOKIE = 'ysBasket';
    private static readonly BASKETID_COOKIE = 'ysBasketId';

    private cookieExpiration = 86400;
    private cookieExtendedExpiration = 86400 * 365;

    constructor(
        private store: Store,
        private toolsService: ToolsService,
    ) {
    }

    setToken(data, extendedExpiration) {
        let decodedCookie = {
            token: '',
            user: undefined,
        };
        console.log(data);
        const cookieData = Cookies.get(CookieService.LOGIN_COOKIE);
        if (cookieData) {
            decodedCookie = JSON.parse(cookieData);
        }
        decodedCookie.token = data;
        let expires = this.cookieExpiration;
        if (extendedExpiration) {
            expires = this.cookieExtendedExpiration;
            console.log(expires);
        }
        Cookies.set(
            CookieService.LOGIN_COOKIE, JSON.stringify(decodedCookie),
            { expires }
        );
    }

    setUser(data) {
        let decodedCookie = {
            token: '',
            user: undefined,
        };
        console.log(data);
        const cookieData = Cookies.get(CookieService.USER_COOKIE);
        if (cookieData) {
            decodedCookie = JSON.parse(cookieData);
        }
        decodedCookie.user = data;
        const expires = this.cookieExtendedExpiration;
        Cookies.set(
            CookieService.USER_COOKIE, JSON.stringify(decodedCookie),
            { expires }
        );
    }

    setBasket(data) {
        const expires = this.cookieExtendedExpiration;
        Cookies.set(
            CookieService.BASKET_COOKIE, JSON.stringify(data),
            { expires }
        );
    }

    getBasket() {
        if (Cookies.get(CookieService.BASKET_COOKIE)) {
            const cookieData = JSON.parse(Cookies.get(CookieService.BASKET_COOKIE));
            this.store.set('basket', cookieData);
            return true;
        }
    }

    renewBasketId() {
        const basketId = this.toolsService.newUUID();
        const expires = this.cookieExtendedExpiration;
        Cookies.set(CookieService.BASKETID_COOKIE, basketId, { expires });
        this.store.set('basketId', basketId);
        console.log('after renew', Cookies.get(CookieService.BASKETID_COOKIE));
    }

    getBasketId() {
        let basketId = '';

        if (Cookies.get(CookieService.BASKETID_COOKIE)) {
            basketId = Cookies.get(CookieService.BASKETID_COOKIE);
            this.store.set('basketId', basketId);
        } else {
            basketId = this.toolsService.newUUID();
            const expires = this.cookieExtendedExpiration;
            Cookies.set(CookieService.BASKETID_COOKIE, basketId, { expires });
            this.store.set('basketId', basketId);
        }
        console.log('returning basketID: ' + basketId);
        return basketId;
    }

    set(field, data, extendedExpiration?) {
        let decodedCookie = {
            token: '',
            user: undefined,
        };
        console.log(data);
        const cookieData = Cookies.get(CookieService.LOGIN_COOKIE);
        if (cookieData) {
            decodedCookie = JSON.parse(cookieData);
        }
        decodedCookie[field] = data;
        let expires = this.cookieExpiration;
        if (extendedExpiration) {
            expires = this.cookieExtendedExpiration;
            console.log(expires);
        }
        Cookies.set(
            CookieService.LOGIN_COOKIE, JSON.stringify(decodedCookie),
            { expires }
        );
    }

    extendCookieExpiration() {

    }

    remove() {
        console.log('fired cookie remove');
        Cookies.expire(CookieService.LOGIN_COOKIE);
        Cookies.expire(CookieService.USER_COOKIE);
        Cookies.expire(CookieService.BASKET_COOKIE);
        this.store.set('user', undefined);
        this.store.set('token', '');
    }


    check() {
        if (Cookies.get(CookieService.LOGIN_COOKIE)) {
            const cookieData = JSON.parse(Cookies.get(CookieService.LOGIN_COOKIE));
            this.store.set('token', cookieData.token);
            this.store.set('loggedIn', true);
            return true;
        } else {
            this.store.set('user', undefined);
            this.store.set('token', '');
            this.store.set('loggedIn', false);
            return false;
        }
    }

    checkUser() {
        if (Cookies.get(CookieService.USER_COOKIE)) {
            const cookieData = JSON.parse(Cookies.get(CookieService.USER_COOKIE));
            this.store.set('user', cookieData.user);
            this.store.set('accountType', cookieData.user.accountType);
            return true;
        } else {
            this.store.set('user', undefined);
            this.store.set('loggedIn', false);
            this.store.set('accountType', '');
            return false;
        }
    }

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                resolve(this.check());
            }
        );
        return promise;
    }

    hasUserData() {
        const promise = new Promise(
            (resolve, reject) => {
                resolve(this.checkUser());
            }
        );
        return promise;
    }


}
