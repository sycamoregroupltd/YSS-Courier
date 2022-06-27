import { Injectable } from '@angular/core';
import { Store } from '../store';
import {
    AlertConfirmData,
    AlertData,
    CustomAlertData,
    DefaultAlertData,
    DefaultSimpleAlertData, SimpleAlertData
} from '../data-types/alert-data';


@Injectable({
    providedIn: 'root'
})
export class AlertService
{
    private timeout = null;

    constructor(
        private store: Store,
    )
    {
    }

    notification(notifications, timeout?): Promise<any>
    {
        return new Promise<any>((resolve, reject) =>
        {
            this.store.set('alerts', {
                ...this.resetAlert(),
                notifications,
                resolve,
                reject
            });

            clearTimeout(this.timeout);
            if (timeout) {
                this.timeout = setTimeout(() =>
                {
                    this.clearMessage();
                }, timeout);
            }
        });
    }

    error(errors): Promise<any>
    {
        return new Promise<any>((resolve, reject) =>
        {
            this.store.set('alerts', {
                ...this.resetAlert(),
                errors,
                resolve,
                reject
            });
        });
    }

    confirm(confirmAction: AlertConfirmData): Promise<any>
    {
        return new Promise<any>((resolve, reject) =>
        {
            this.store.set('alerts', {
                ...this.resetAlert(),
                confirmAction,
                resolve,
                reject
            });
        });
    }

    customAlert(customAlert: CustomAlertData, override: AlertData = {} as AlertData): Promise<any>
    {
        return new Promise<any>((resolve, reject) =>
        {

            this.store.set('alerts', {
                ...this.resetAlert(),
                customAlert,
                resolve,
                reject,
                ...override
            });
        });
    }

    async simple(msgOrObj: string | SimpleAlertData): Promise<any>
    {
        return new Promise<any>((resolve, reject) =>
        {
            if (typeof msgOrObj === 'string' || msgOrObj instanceof String) {
                msgOrObj = {
                    ...DefaultSimpleAlertData,
                    message: msgOrObj as string
                };
            }
            this.store.set('alerts', {
                ...this.resetAlert(),
                simple: msgOrObj,
                resolve,
                reject
            });
        });
    }

    clearMessage(): void
    {
        this.store.set('alerts', this.resetAlert());
    }

    private resetAlert(): AlertData
    {
        const g = this.store.selectForLocal('alerts');
        return { ...g, ...DefaultAlertData } as AlertData;
    }
}
