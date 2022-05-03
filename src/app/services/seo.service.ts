import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    env = environment;

    constructor(
        private meta: Meta
    ) {
    }

    getMetaTags() {
        const metaEl: HTMLMetaElement = this.meta.getTag('name= "keywords"');
    }

    addMetaTag(name, content) {
        this.meta.addTag({ name, content });
    }

    updateMetaTags(name, content) {
        this.meta.updateTag({ name, content });
    }

}
