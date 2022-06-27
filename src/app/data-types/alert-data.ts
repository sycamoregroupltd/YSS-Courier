import { TemplateRef } from "@angular/core";

export type AlertData = {
    errors: Array<any>;
    notifications: Array<any>;
    statusUpdate: any; // can't find this one used
    confirmAction: AlertConfirmData | null;
    simple: SimpleAlertData | null;
    customAlert: CustomAlertData | null;
    resolve: any | null;
    reject: any | null;
    customCss: string | null;
};

export const DefaultAlertData = {
    errors: [],
    notifications: [],
    confirmAction: null,
    simple: null,
    customAlert: null
} as AlertData;

export type SimpleAlertData = {
    message: string;
    okText: string;
    confirmCb?: (data: any) => void;
    okClass: 'btn-success' | 'btn-danger' | 'btn-warning' | 'btn-primary';
    data: any;
};

export const DefaultSimpleAlertData = {
    message: '',
    okText: 'Ok',
    confirmCb: null,
    okClass: 'btn-primary',
    data: null
} as SimpleAlertData;

export type CustomAlertData = {
    template: TemplateRef<any>;
    confirmText: string;
    confirmCb?: (data: any) => void;
    confirmClass: 'btn-success' | 'btn-danger' | 'btn-warning' | 'btn-primary';
    cancelText: string;
    cancelCb?: (data: any) => void;
    canConfirmCb?: () => boolean;
    data: any;
};

export const DefaultCustomAlertData = {
    template: null,
    confirmText: 'Ok',
    confirmClass: 'btn-primary',
    confirmCb: null,
    cancelText: 'Cancel',
    cancelCb: null,
    canConfirmCb: null,
    data: null
} as CustomAlertData;

export type AlertConfirmData = {
    title: string;
    message: string;
    confirmText: string;
    confirmCb?: (data: any) => void;
    confirmClass: 'btn-success' | 'btn-danger' | 'btn-warning' | 'btn-primary';
    cancelText: string;
    cancelCb?: (data: any) => void;
    data: any;
};

export const defaultAlertConfirmData = {
    title: '',
    message: '',
    confirmText: 'Ok',
    confirmClass: 'btn-primary',
    confirmCb: null,
    cancelText: 'Cancel',
    cancelCb: null,
    data: null
} as AlertConfirmData;
