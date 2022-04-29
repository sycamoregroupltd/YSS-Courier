import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {ActivatedRoute} from '@angular/router';
import {Store} from '../../store';
import {OverlayService} from '../../services/overlay.service';
import * as moment from 'moment';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    user = this.store.selectForLocal('user');


    public users = 0;
    public message: any = {};
    // public messages: any[] = [];
    // public groups: any[] = [];
    // public group: any;

    chatStore$ = this.store.select<any>('chatStore');

    constructor(
        public cs: ChatService,
        private route: ActivatedRoute,
        private store: Store,
        private overlayService: OverlayService,
    ) {
    }

    ngOnInit(): void {
        this.getGroups();

        this.cs.getUsers().subscribe((users: number) => {
            this.users = users;
        });

        this.scrollBottom();
    }

    startChatGroup(recipient, recipientType) {
        this.cs.startChatGroupFromWithinChat(recipient, recipientType).subscribe(data => {

            this.cs.getGroups().subscribe(groupData => {
                const chatStore = this.store.selectForLocal('chatStore');
                this.selectGroupById(data.data.groupId);
            });

        });
    }

    getGroups() {
        this.cs.getGroups().subscribe(data => {
            const chatStore = this.store.selectForLocal('chatStore');
            if (chatStore.groupToOpen) {
                this.selectGroupById(chatStore.groupToOpen);
            }
            // this.groups = data.data;
            // if (data.data.length) {
            //     this.selectGroup(data.data[0]);
            // }
        });
    }
    selectGroupById(groupId) {
        const chatStore = this.store.selectForLocal('chatStore');
        chatStore.groups.forEach((g, idx) => {
            if (g.id === groupId) {
                chatStore.groupToOpen = undefined;
                this.store.set('chatStore', chatStore);
                this.selectGroup(g);
            }
        });

    }
    selectGroup(group) {
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
        this.cs.getByGroupId(groupId).subscribe(data => {
            // this.messages = data.data;
            this.markAsRead(groupId);
            this.scrollBottom();
        });
    }

    markAsRead(groupId) {
        this.cs.markAsRead(groupId).subscribe();
    }

    addChat() {
        const user = this.store.selectForLocal('user');
        const chatStore = this.store.selectForLocal('chatStore');

        this.message.createdAt = new Date();
        this.message.groupId = chatStore.group.id;
        this.message.user = {
            id: user.id,
            name: user.contact.firstname + ' ' + user.contact.surname,
            companyId: '',
        };
        if (user.company)  {
            this.message.user.company = user.company.id;
        }
        chatStore.messages.push(this.message);
        this.store.set('chatStore', chatStore);

        // this.messages.push(this.message);
        this.cs.sendChat(this.message);
        this.message = {content: ''};
        this.scrollBottom();
    }


    scrollBottom() {
        this.cs.scrollBottom();
        // const typeBox = document.getElementById('chat-window');
        // if (typeBox) {
        //     setTimeout(() => typeBox.scrollTo(0, typeBox.scrollHeight), 200);
        // }
    }

    viewGroups() {
        const chatStore = this.store.selectForLocal('chatStore');
        chatStore.group = undefined;
        this.store.set('chatStore', chatStore);
    }

    close() {
        this.viewGroups();
        this.overlayService.closeAll();
    }

}
