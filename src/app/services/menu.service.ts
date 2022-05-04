import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '../store';
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
}
