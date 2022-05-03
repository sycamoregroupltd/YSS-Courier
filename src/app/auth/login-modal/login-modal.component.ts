import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';
import { OverlayService } from '../../services/overlay.service';
import { UserService } from '../../services/user.service';
import { BasketService } from '../../services/basket.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
    params: any;

    constructor(
        private store: Store,
        private overlayService: OverlayService,
        private userService: UserService,
        private basketService: BasketService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    register() {
        this.overlayService.toggle('registerModal');
    }

    authenticated(e) {
        if (e) {
            const basket = this.store.selectForLocal('basket');
            const user = this.store.selectForLocal('user');
            let deliveryAddresses = [];

            basket.customer = user;
            if (user.address) {
                basket.billingAddress = user.address;
            }

            this.userService
                .findAddressesByCustomer(user.id)
                .subscribe((data: any) => {
                    deliveryAddresses = data.data;

                    if (deliveryAddresses.length) {
                        basket.deliveryAddress = deliveryAddresses[0];
                        basket.deliveryPostcode = deliveryAddresses[0].postcode;
                    }
                    this.store.set('deliveryAddresses', deliveryAddresses);
                    this.basketService.saveBasketChanges(basket, 'modalAuth');
                    this.close();
                });
        }
    }

    close() {
        this.overlayService.closeAll();
    }

    forgottenPassword() {
        this.close();
    }
}
