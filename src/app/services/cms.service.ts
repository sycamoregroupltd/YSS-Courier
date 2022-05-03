import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CmsService {

    constructor(
        private http: HttpClient,
        private apiService: ApiService,
        private store: Store,
    ) {
    }

    search(searchText) {
        const dataToSend = {
            searchText
        };
        return this.http.post(env.apiPath + 'cms/search', dataToSend, this.apiService.getHttpOptions()).pipe(map((data: any) => {
            this.store.set('pages', data.data);
            return data.data;
        }));
    }

    pages() {
        return this.http.get(env.apiPath + 'cms/pages', this.apiService.getHttpOptions()).pipe(map((data: any) => {
            this.store.set('pages', data.data);
            return data.data;
        }));
    }

    pageSnippets(route) {
        const routeToFind = route.split('?')[0];
        return this.http.get(env.apiPath + 'cms/page/snippets/' + routeToFind, this.apiService.getHttpOptions())
            .pipe(map((data: any) => {
            this.store.set('pageSnippets', data.data);
            return data.data;
        }));
    }

    resetPageSnippets() {
        this.store.set('pageSnippets', []);
    }

    quickLinks(type) {
        return this.http.get(env.apiPath + 'pages/quicklinks/' + type, this.apiService.getHttpOptions()).pipe(map((data: any) => {
            return data.data;
        }));
    }

    sendContactForm(contact) {
        const dataToSend = {
            contact
        };
        return this.http.post(env.apiPath + 'contactus', dataToSend, this.apiService.getHttpOptions()).pipe(map((data: any) => {
            return data.data;
        }));
    }

    getSettings() {
        return this.http.get(env.apiPath + 'settings', this.apiService.getHttpOptions())
            .pipe(map((data: any) => {
                this.store.set('settings', data.data);
                return data.data;
            }));

    }

    gallery(id) {
        return this.http.get(env.apiPath + 'cms/gallery/' + id, this.apiService.getHttpOptions())
            .pipe(map((data: any) => {
                return data.data;
            }));
    }

}
