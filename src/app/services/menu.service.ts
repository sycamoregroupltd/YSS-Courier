import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '../store';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    env = environment;

    constructor(
        private http: HttpClient,
        private apiService: ApiService,
        private store: Store,
    ) {
    }

    all() {
        return this.http.get(this.env.apiPath + 'cms/menus', this.apiService.getHttpOptions()).subscribe((data: any) => {
            this.store.set('menus', data.data);
        });
    }


    menuByRoute(route) {
        const routeToFind = route.split('?')[0];
        return this.http.get(this.env.apiPath + 'cms/menugroup/' + routeToFind, this.apiService.getHttpOptions()).subscribe((data: any) => {
            this.store.set('activeMenu', data.data);
        });
    }

    menuGroups() {
        return this.http.get(this.env.apiPath + 'cms/public/menugroups', this.apiService.getHttpOptions())
            .subscribe((data: any) => {
                this.store.set('menu', data.data);
            });
    }

    menuGroupMenus(menuGroupId) {
        return this.http.get(this.env.apiPath + 'cms/menugroup/' + menuGroupId, this.apiService.getHttpOptions()).pipe(map((data: any) => {
            if (menuGroupId === 'header') {
                this.store.set('menus', data.data);
            }
            const menu = this.store.selectForLocal('menu');
            menu[menuGroupId] = data.data;
            this.store.set('menu', menu);

            return data.data;
        }));
    }

}
