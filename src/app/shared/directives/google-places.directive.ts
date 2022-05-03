import {
    Directive,
    ElementRef,
    OnInit,
    Output,
    EventEmitter,
} from '@angular/core';

import { google } from 'google-maps';
// const google = require('@types/googlemaps');
declare var google: any;

@Directive({
    selector: '[appGooglePlaces]',
})
export class GooglePlacesDirective implements OnInit {
    @Output() onAddressChange = new EventEmitter();
    private element: HTMLInputElement;

    constructor(private elRef: ElementRef) {
        this.element = elRef.nativeElement;
    }

    ngOnInit() {
        const autocomplete = new google.maps.places.Autocomplete(this.element);

        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            // Emit the new address object for the updated place
            this.onAddressChange.emit(
                this.getFormattedAddress(autocomplete.getPlace())
            );
        });
    }

    getFormattedAddress(place) {
        // @params: place - Google Autocomplete place object
        // @returns: location_obj - An address object in human readable format
        const location_obj = {};
        for (let i = 0; i < place.address_components.length; i++) {
            const item = place.address_components[i];

            location_obj.formatted_address = place.formatted_address;
            if (item.types.indexOf('locality') > -1) {
                location_obj.locality = item.long_name;
            } else if (
                item.types.indexOf('administrative_area_level_1') > -1
            ) {
                location_obj.admin_area_l1 = item.short_name;
            } else if (item.types.indexOf('street_number') > -1) {
                location_obj.street_number = item.short_name;
            } else if (item.types.indexOf('route') > -1) {
                location_obj.route = item.long_name;
            } else if (item.types.indexOf('country') > -1) {
                location_obj.country = item.long_name;
            } else if (item.types.indexOf('postal_code') > -1) {
                location_obj.postal_code = item.short_name;
            }
        }
        return location_obj;
    }
}
