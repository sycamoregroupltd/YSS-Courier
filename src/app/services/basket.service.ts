import { Injectable } from '@angular/core';
import { Store } from '../store';
import { CookieService } from './cookie.service';
import { ApiService } from './api.service';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class BasketService {
    env = environment;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private http: HttpClient,
        private store: Store,
        private cookieService: CookieService,
    ) {
    }

    getBasketId() {
        return this.cookieService.getBasketId();
    }

    getBasket(basketId) {
        return this.http.get(this.env.apiPath + 'basket/' + basketId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    let basketData;
                    if (data.data) {
                        basketData = data.data;
                        this.store.set('basket', basketData);
                    } else {
                        basketData = this.store.selectForLocal('basket');
                    }
                    return basketData;
                }, catchError(this.apiService.handleError))
            );
    }

    addToBasket(item) {
        const basket = this.store.selectForLocal('basket');
        basket.items.push(item);
        this.store.set('basket', basket);
        this.calculateBasketTotal();
    }

    addBespokeItems(items) {
        items.forEach(item => {

            const sku: any = {
                skuId: '',
                productDetailId: 0,
                product: { id: '', productCode: '', name: '', slug: '', image: '' },
                qty: 10,
                unitPrice: 0,
                totalPrice: 0,
                weight: 0,
            };

            sku.product = item;
            sku.product.isBespoke = true;
            sku.sample = false;
            sku.product.id = 0;
            sku.product.productCode = '';
            sku.product.name = '';
            sku.product.slug = '';
            sku.product.supplier = {
                id: item.range.supplier
            };
            sku.product.rangeId = sku.product.range.id;

            sku.sellUnit = item.sellUnit;
            sku.product.image = item.range.imageUrl;
            sku.product.name = `Bespoke ${item.range.name} ${sku.product.type.name}`;
            sku.product.productCode = 'bespoke';
            if (sku.product.type.sellUnits.length) {
                sku.sellUnit = sku.product.type.sellUnits[0];
            }
            sku.skuId = '';
            sku.productDetailId = 0;
            sku.qty = +item.quantity;
            // pallet weight was being calculated incorrectly as it was multiplying by the QTY in the courier API method
            // sku.weight = +item.weightPerSellUnit * +item.quantity;
            sku.weight = +item.weightPerSellUnit;
            sku.unitPrice = +item.pricePerSellUnit;
            sku.totalPrice = (+item.pricePerSellUnit * +item.quantity);


            delete sku.product.range;

            this.addToBasket(sku);
        });

    }

    toggleDeliveryAddress() {
        const basket = this.store.selectForLocal('basket');
        if (!basket.differentDeliveryAddress) {
            basket.differentDeliveryAddress = true;
        } else {
            basket.differentDeliveryAddress = false;
        }
        this.saveBasketChanges(basket, 'internal');
    }

    saveBasketChanges(basket, src) {
        this.store.set('basket', basket);
        this.saveBasketToStorage(basket);
    }

    setGuest(v) {
        const basket = this.store.selectForLocal('basket');
        basket.guest = v;
        this.saveBasketChanges(basket, 'internal');
    }

    setToken(v) {
        const basket = this.store.selectForLocal('basket');
        basket.token = v;
        this.saveBasketChanges(basket, 'internal');
    }

    calculateBasketTotal() {
        const basket = this.store.selectForLocal('basket');
        basket.values.gross = 0;
        basket.values.vat = 0;
        basket.values.net = 0;
        basket.values.voucherDiscount = 0;

        for (let i = 0; i < basket.items.length; i++) {
            basket.values.net = +basket.values.net + (+basket.items[i].unitPrice * +basket.items[i].qty);
        }

        if (basket.voucher) {
            if (basket.voucher.discountType === 1) {
                basket.values.voucherDiscount = ((+basket.values.net / 100) * +basket.voucher.discountValue);
                basket.values.net = +basket.values.net - basket.values.voucherDiscount;
            }
            if (basket.voucher.discountType === 2) {
                basket.values.voucherDiscount = +basket.voucher.discountValue;
                basket.values.net = +basket.values.net - basket.values.voucherDiscount;
            }
        }

        basket.values.vat = ((+basket.values.net / 100) * 20).toFixed(2);
        basket.values.gross = (+basket.values.net + +basket.values.vat + +basket.values.delivery + +basket.values.deliveryVat).toFixed(2);
        this.store.set('basket', basket);
        this.saveBasketChanges(basket, 'internal');
    }

    deleteBasketItem(idx) {
        const basket = this.store.selectForLocal('basket');
        basket.items.splice(idx, 1);
        this.store.set('basket', basket);
        this.calculateBasketTotal();
    }

    emptyBasket() {
        const basket = this.store.selectForLocal('basket');
        basket.source = 'public';
        basket.items = [];
        basket.potentialQty = 0;
        basket.voucher = undefined;
        basket.voucherCodeEntered = '';
        basket.deliveryInstructions = '';
        basket.differentDeliveryAddress = false;
        basket.deliveryInstructions = '';
        basket.token = undefined;
        basket.customer = undefined;
        basket.deliveryAddress = undefined;
        basket.billingAddress = undefined;
        basket.createdBy = undefined;
        this.store.set('basketId', '');
        this.store.set('basket', basket);
        this.calculateBasketTotal();
    }

    renewBasket() {
        const currentBasketId = this.getBasketId();
        this.cookieService.renewBasketId();

        const basket = this.store.selectForLocal('basket');
        basket.source = 'public';
        basket.items = [];
        basket.potentialQty = 0;
        basket.voucher = undefined;
        basket.voucherCodeEntered = '';
        basket.deliveryInstructions = '';
        basket.differentDeliveryAddress = false;
        basket.deliveryInstructions = '';
        basket.token = undefined;
        basket.discount = {
            type: 'pound',
            value: 0,
        };
        basket.values = {
            discount: 0,
            gross: 0,
            net: 0,
            vat: 0,
            voucherDiscount: 0,
            delivery: 0,
            deliveryVat: 0,
        };

        // basket.customer = undefined;
        // basket.deliveryAddress = undefined;
        // basket.billingAddress = undefined;
        // basket.createdBy = undefined;
        this.store.set('basket', basket);

        return this.http.delete(this.env.apiPath + 'basket/' + currentBasketId, this.apiService.getHttpOptions())
            .subscribe();
    }


    clearUserFromBasket() {
        const basket = this.store.selectForLocal('basket');
        basket.deliveryInstructions = '';
        basket.token = undefined;
        basket.deliveryAddress = undefined;
        basket.billingAddress = undefined;
        basket.customer = undefined;
        basket.createdBy = undefined;
        this.store.set('basket', basket);
        this.calculateBasketTotal();
    }

    deleteIntent() {
        const basket = this.store.selectForLocal('basket');
        delete basket.intent;
        this.store.set('basket', basket);
    }


    saveBasketToStorage(basket) {
        this.cookieService.setBasket(basket);
        // const basketId = this.store.selectForLocal('basketId');
        const basketId = this.cookieService.getBasketId();

        const dataToSend: any = {
            basket
        };
        if (basketId) {
            dataToSend.basketId = basketId;
        }

        return this.http.post(this.env.apiPath + 'basket', dataToSend, this.apiService.getHttpOptions())
            .subscribe((data: any) => {
            });
    }

    applyVoucher(voucherCode) {
        return this.http.get(this.env.apiPath + 'voucher/code/' + voucherCode, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));

    }

    processBasket() {
        const basket = this.store.selectForLocal('basket');

        const dataToSend = {
            basket
        };

        return this.http.post(this.env.apiPath + 'orders/create/', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));

    }


}
