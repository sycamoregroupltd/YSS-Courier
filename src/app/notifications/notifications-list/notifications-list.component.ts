import { Component, Input, OnInit } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { Store } from '../../store';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
    selector: 'app-notifications-list',
    templateUrl: './notifications-list.component.html',
    styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {
    @Input() showRead = false;
    @Input() aside = true;

    notifications$ = this.store.select<any[]>('notifications');

    params = {
        limit: 10,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'contacts.firstname',
        sorts: [],
    };

    constructor(
        private overlayService: OverlayService,
        private store: Store,
        private db: AngularFirestore,
    ) {
    }

    ngOnInit(): void {
    }

    delete(notification) {
        this.db.collection('notifications')
            .doc(notification.id)
            .update({ deleted: true, read: true });
    }

    markAsRead(notification) {
        this.db.collection('notifications')
            .doc(notification.id)
            .update({ read: true });

    }

    close() {
        this.overlayService.closeAll();
    }

    viewNotifications() {
        this.overlayService.toggle('notifications');
    }
}
