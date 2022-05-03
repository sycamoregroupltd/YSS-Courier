import { pluck, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from './state';

const state: State = {
    settings: {},
    navigation: {
        current: '',
        last: '',
        next: '',
    },
    RegisteredInBasketFlow: false,
    navigationHistory: [],
    signInRoute: 'account',
    chatStore: {
        unread: 0,
        groups: [],
        group: undefined,
        replyingTo: undefined,
        groupToOpen: undefined,
        messages: [],
    },
    companyUsers: {
        data: [],
        params: {
            company: '',
            name: '',
            email: '',
            jobTitle: '',
            town: '',
            postcode: '',
            mobile: '',
            landline: '',
            status: '',
            freeText: '',
            companyId: '',
            accountType: 'supplier',
            limit: 10,
            limits: [10, 25, 50, 75, 100],
            page: 0,
            pages: 0,
            pageArray: [],
            totalRecords: 0,
            sort: 'companies.name',
            sorts: [],
        },
    },
    notifications: { unread: 0, data: [] },
    deliveryAddresses: [],
    basketId: '',
    basket: {
        type: 'order',
        lastStep: 'entry',
        source: 'public',
        sampleOnly: false,
        potentialQty: 0,
        items: [],
        voucher: undefined,
        voucherCodeEntered: '',
        deliveryInstructions: '',
        differentDeliveryAddress: false,
        deliveryAddress: undefined,
        deliveryPostcode: '',
        deliveryRestrictions: [],
        billingAddress: undefined,
        customer: undefined,
        guest: true,
        allowBoards: false,
        gravelDriveway: false,
        discount: {
            type: 'pound',
            value: 0,
        },
        values: {
            discount: 0,
            gross: 0,
            net: 0,
            vat: 0,
            voucherDiscount: 0,
            delivery: 0,
            deliveryVat: 0,
        },
        token: undefined,
        paymentMethod: undefined,
        shipments: [],
        deliveryOptions: {
            allowPremium: true,
            premium: 0,
            economy: 0,
            geo: {
                travelKM: 0,
                travelMiles: 0,
                travelMinutes: 0,
                lat: undefined,
                lng: undefined,
            },
        },
    },
    accountType: '',
    protectedRoute: false,
    confirmationEmail: '',
    companyRequests: [],
    menus: [],
    menu: {
        header: undefined,
        footerQL: undefined,
        ttd: undefined,
    },
    subMenu: [],
    activeMenu: undefined,
    activeRoute: '',
    pages: undefined,
    pageSnippets: [],
    device: undefined,
    guestUser: undefined,
    user: undefined,
    userToEdit: undefined,
    asideOpen: false,
    growler: {
        errors: [],
        notifications: [],
        simple: '',
        confirmAction: undefined,
    },
    alerts: {
        errors: [],
        notifications: [],
        simple: '',
        confirmAction: undefined,
    },
    overlays: {
        userEdit: false,
        processing: false,
        loginModal: false,
        registerModal: false,
        addedToBasket: false,
    },
    overlayData: undefined,
    cms: undefined,
    categories: [],
    mobileMenu: false,
    search: false,
    searchText: '',
    searchResults: [],
    token: undefined,
    loggedIn: false,
};

export class Store {
    private subject = new BehaviorSubject<State>(state);
    private store = this.subject.asObservable().pipe(distinctUntilChanged());

    get value() {
        return this.subject.value;
    }

    select<T>(name: string): Observable<T> {
        return this.store.pipe(pluck(name));
    }

    selectForLocal(name: string) {
        const d = this.subject.value;
        return d[name];
    }

    set(name: string, thisState: any) {
        this.subject.next({
            ...this.value,
            [name]: thisState,
        });
    }
}
