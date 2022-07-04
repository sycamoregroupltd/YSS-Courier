import { Injectable } from '@angular/core';
import { Store } from '../store';

@Injectable({
    providedIn: 'root'
})
export class OverlayService {
    body = document.getElementsByTagName('body')[0];

    constructor(
        private store: Store,
    ) {
    }

    get() {
        return this.store.selectForLocal('overlays');
    }

    open(v) {
        const o = this.store.selectForLocal('overlays');
        o[v] = true;
        this.store.set('overlays', o);
    }

    close(v) {
        const o = this.store.selectForLocal('overlays');
        o[v] = false;
        this.store.set('overlays', o);
        this.store.set('asideOpen', false);
    }

    toggleModal(overlayToToggle) {
        const overlays = this.get();

        if (overlays[overlayToToggle]) {
            overlays[overlayToToggle] = false;
        } else {
            overlays[overlayToToggle] = true;
            this.body.classList.add('body-freeze');
        }

        const objKeys = Object.keys(overlays);
        let anOverlayIsOpen = false;
        for (let i = 0; i < objKeys.length; i++) {
            if (overlays[objKeys[i]]) {
                anOverlayIsOpen = true;
            }
        }
        if (anOverlayIsOpen) {
            this.body.classList.add('body-freeze');
        } else {
            this.body.classList.remove('body-freeze');
        }

        this.store.set('overlays', overlays);
    }

    toggle(overlayToToggle) {

        const overlays = this.get();
        const objKeys = Object.keys(overlays);

        for (let i = 0; i < objKeys.length; i++) {
            if (objKeys[i] !== overlayToToggle) {
                overlays[objKeys[i]] = false;
            }
        }

        if (overlays[overlayToToggle]) {
            overlays[overlayToToggle] = false;
            this.body.classList.remove('body-freeze');
            this.store.set('asideOpen', false);
        } else {
            overlays[overlayToToggle] = true;
            this.body.classList.add('body-freeze');
            this.store.set('asideOpen', true);
        }
        this.store.set('overlays', overlays);
    }

    closeAll() {
        const overlays = this.get();
        const objKeys = Object.keys(overlays);

        for (let i = 0; i < objKeys.length; i++) {
            overlays[objKeys[i]] = false;
        }
        this.body.classList.remove('body-freeze');

        this.store.set('asideOpen', false);
        this.store.set('overlays', overlays);
    }

}
