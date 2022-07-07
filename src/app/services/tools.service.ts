import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToolsService {

    constructor() {
    }

    sessionId() {
        const sessionId = localStorage.getItem('sessionId');
        if (sessionId) {
            return sessionId;
        }

        const newSessionId = this.newUUID();
        // set the tmpSessionId that will persist login and reference work done whilst signed out
        localStorage.setItem('tmpSessionId', newSessionId);
        return this.setSessionId(newSessionId);
    }

    setSessionId(sessionId) {
        localStorage.setItem('sessionId', sessionId);
        return sessionId;
    }

    logoutSessionId() {
        localStorage.setItem('sessionId', localStorage.getItem('tmpSessionId'));
    }

    newUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    getMonths() {
        return [
            { id: 1, name: 'January' },
            { id: 2, name: 'February' },
            { id: 3, name: 'March' },
            { id: 4, name: 'April' },
            { id: 5, name: 'May' },
            { id: 6, name: 'June' },
            { id: 7, name: 'July' },
            { id: 8, name: 'August' },
            { id: 9, name: 'September' },
            { id: 10, name: 'October' },
            { id: 11, name: 'November' },
            { id: 12, name: 'December' },
        ];
    }

    getYears(noOfYears) {
        const dateToday = new Date();
        const currentYear = dateToday.getFullYear();
        const years = [];
        for (let i = currentYear; i < currentYear + noOfYears; i++) {
            years.push(i);
        }
        return years;
    }

    getMonthNames() {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    datediff(first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }
}
