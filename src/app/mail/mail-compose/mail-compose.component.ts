import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { Store } from '../../store';
import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'app-mail-compose',
    templateUrl: './mail-compose.component.html',
    styleUrls: ['./mail-compose.component.scss'],
})
export class MailComposeComponent implements OnInit {
    @Output() finishedNewMessage = new EventEmitter();

    chatStore = this.store.selectForLocal('chatStore');
    overlays$ = this.store.select<any>('overlays');
    user = this.store.selectForLocal('user');

    users = [];
    public message: any = {
        name: '',
        content: '',
        recipient: [],
        category: 0,
    };

    tinyInit = {
        height: 200,
        menubar: false,
        plugins: [
            'advlist autolink lists link charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'media paste',
        ],
        toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist | removeformat |visualblocks',
    };

    constructor(
        private overlayService: OverlayService,
        private store: Store,
        private chatService: ChatService,
        private toastrService: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.message.user = this.user;

        if (this.chatStore.replyingTo) {
            this.message.groupId = this.chatStore.replyingTo.groupId;
            this.message.name = this.chatStore.replyingTo.name;
        }

        if (
            this.user.accountType === 'customer' ||
            this.user.accountType === 'trade' ||
            this.user.accountType === 'supplier'
        ) {
            this.message.recipient.push({
                accountType: 'admin',
                company: null,
                details: 'Customer Services (admin)',
                id: 'd6e37e44-ae9b-4c45-89f5-a3508970b876',
                name: 'Customer Services',
            });
        }
    }

    addChat() {
        const user = this.store.selectForLocal('user');
        const chatStore = this.store.selectForLocal('chatStore');
        this.message.mail = true;
        this.message.createdAt = new Date();
        // this.message.groupId = chatStore.group.id;
        this.message.user = {
            id: user.id,
            name: user.contact.firstname + ' ' + user.contact.surname,
            companyId: '',
        };
        if (user.company) {
            this.message.user.company = user.company.id;
        }

        chatStore.messages.push(JSON.parse(JSON.stringify(this.message)));
        this.store.set('chatStore', chatStore);

        this.chatService.sendChat(this.message);
        this.message.content = '';
        this.refreshChat();
        this.finishedNewMessage.emit(true);
    }

    close() {
        this.overlayService.closeAll();
    }

    refreshChat() {
        setTimeout(() => {
            this.chatService.getGroups().subscribe();
            // this.close();
        }, 1000);
    }

    back() {
        this.finishedNewMessage.emit(false);
    }

    searchUsers() {
        this.overlayService.toggle('mailUserSearch');
    }

    addUser(e) {
        this.message.recipient.push(e);
        this.toastrService.success('', 'Recipient added');
    }

    removeUser(e) {
        for (let i = 0; i < this.message.recipient.length; i++) {
            if (this.message.recipient[i].id === e.id) {
                this.message.recipient.splice(i, 1);
            }
        }
        this.toastrService.success('', 'Recipient removed');
    }
}
