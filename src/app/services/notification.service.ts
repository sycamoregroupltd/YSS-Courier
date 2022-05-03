import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '../store';
import { ToolsService } from './tools.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    query: any;

    constructor(
        private db: AngularFirestore,
        private store: Store,
        private toolsService: ToolsService,
    ) {
    }

    listenToNotifications() {
        const user = this.store.selectForLocal('user');
        if (!user.company) {
            this.query = this.db.collection('notifications', ref => ref
                .where('deleted', '==', false)
                .where('adminOnly', '==', false)
                .where('userId', '==', user.id)
                .orderBy('createdAt', 'desc')
            ).valueChanges();

        } else {
            this.query = this.db.collection('notifications', ref => ref
                .where('deleted', '==', false)
                .where('adminOnly', '==', false)
                .where('companyId', '==', user.company.id)
                .orderBy('createdAt', 'desc')
            ).valueChanges();

        }

        this.query.subscribe(data => {
            const notifications = this.store.selectForLocal('notifications');
            notifications.unread = 0;
            notifications.data = data;
            notifications.data.forEach(n => {
                if (!n.read) {
                    notifications.unread++;
                }
            });
            this.store.set('notifications', notifications);
        });

    }

    stopListening() {
        this.query.subscribe().unsubscribe();

        this.store.set('notifications', { unread: 0, data: [] });
    }

    send(notificationData) {
        const newId = this.toolsService.newUUID();
        notificationData.id = newId;
        notificationData.read = false;
        notificationData.deleted = false;
        notificationData.createdAt = new Date();
        this.db.collection('notifications').doc(newId).set(notificationData);
    }

}
