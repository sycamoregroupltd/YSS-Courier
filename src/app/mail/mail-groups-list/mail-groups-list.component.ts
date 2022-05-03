import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Store } from '../../store';
import { OverlayService } from '../../services/overlay.service';

@Component({
    selector: 'app-mail-groups-list',
    templateUrl: './mail-groups-list.component.html',
    styleUrls: ['./mail-groups-list.component.scss']
})
export class MailGroupsListComponent implements OnInit {
    @Input() groups;
    @Input() searchTerm;
    @Output() doFilter = new EventEmitter();

    user = this.store.selectForLocal('user');
    overlays$ = this.store.select<any>('overlays');
    groupSelected;

    constructor(
        private chatService: ChatService,
        private store: Store,
        private overlayService: OverlayService,
    ) {
    }

    ngOnInit(): void {
    }

    sortBy() {
        return this.groups.sort((a, b) => b.lastAction - a.lastAction);
    }


    viewGroup(group) {
        const chatStore = this.store.selectForLocal('chatStore');
        chatStore.group = group;
        chatStore.group.unread = 0;

        chatStore.unread = 0;
        chatStore.groups.forEach(g => {
            chatStore.unread = +chatStore.unread + +g.unread;
        });


        this.store.set('chatStore', chatStore);
        // this.group = group;
        // this.group.unread = 0;
        this.getByGroupId(group.id);

    }

    getByGroupId(groupId) {
        this.chatService.getByGroupId(groupId).subscribe(data => {
            // this.messages = data.data;
            this.markAsRead(groupId);
        });
    }

    markAsRead(groupId) {
        this.chatService.markAsRead(groupId).subscribe();
    }

    toggleImportant(group) {
        group.important = group.important ? 0 : 1;
        this.chatService.toggleImportant(group.id, this.user.id, group.important).subscribe();
        this.doFilter.emit();
    }

    toggleArchived(group) {
        group.archived = group.archived ? 0 : 1;
        this.chatService.toggleArchived(group.id, this.user.id, group.archived).subscribe();
        this.doFilter.emit();
    }

    showCategories(group) {
        this.groupSelected = group;
        this.overlayService.toggle('mailCategories');
    }

    removeCategory(group) {
        group.category = undefined;
        this.chatService.removeCategory(group.id, this.user.id).subscribe(data => {

        });
    }
}
