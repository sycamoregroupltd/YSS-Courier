export enum UserAccountType {
    Customer = "customer",
    Trade = "trade",
    Admin = "admin"
}

export type UserData = {
    id: string | null,
    username: string,
    password: string,
    extendedExpiration: boolean,
    accountType: UserAccountType,
    terms: boolean,
    marketing: boolean,
    autoConfirm: boolean,
    contact: {
        company: string,
        address: string,
        firstname: string,
        surname: string,
        email: string,
        mobile: string,
        landline: string | null,
        avatar: string | null,
        jobTitle: string | null,
        fullAddress: string, // one line address, used as a note
        companyName: string, // one line company, used as a note
    },
    address: AddressData | null,
    company: CompanyData | null,
    prospect: 0 | 1,
    favorite: 0 | 1
};

export const DefaultUserData = {
    id: null,
    username: '',
    password: '',
    extendedExpiration: false,
    accountType: UserAccountType.Customer,
    terms: false,
    marketing: false,
    autoConfirm: false,
    contact: {
        company: '',
        address: '',
        firstname: '',
        surname: '',
        email: '',
        mobile: '',
        landline: '',
        avatar: '',
        jobTitle: '',
        fullAddress: '',
        companyName: '',
    },
    address: null,
    company: null,
    prospect: 0,
    favorite: 0
} as UserData;

export const DefaultProspectData = {
    ...DefaultUserData,
    prospect: 1
};

export type CompanyData = {
    id: string | null,
    userId: string | null,
    addressId: string | null,
    primaryUserId: string | null,
    accountType: UserAccountType,
    name: string,
    url: string | null,
    companyNumber: string | null,
    vatNumber: string | null,
    email: string | null,
    mobile: string | null,
    landline: string | null
};

export const DefaultCompanyData = {
    id: null,
    userId: null,
    addressId: null,
    primaryUserId: null,
    accountType: UserAccountType.Trade,
    name: '',
    url: null,
    companyNumber: null,
    vatNumber: null,
    email: null,
    mobile: null,
    landline: null,
} as CompanyData;

export enum AddressType {
    Billing = "billing",
    Delivery = "delivery",
    Invoice = "invoice"
}

export type AddressData = {
    id: string | null,
    userId: string,
    add1: string | null,
    add2: string | null,
    add3: string | null,
    town: string | null,
    county: string | null,
    country: string,
    postcode: string | null,
    isBilling: boolean,
    defaultDeliveryAddress: boolean,
};

export const DefaultAddressData = {
    id: null,
    userId: '',
    add1: null,
    add2: null,
    add3: null,
    town: null,
    county: null,
    country: 'GB',
    postcode: null,
    isBilling: true,
    defaultDeliveryAddress: true,
} as AddressData;

export type NotesData = {
    id?: string,
    createdBy?: string,
    content: string,
    recordId: string,
    type: UserAccountType,
};
