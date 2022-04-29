import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '../../store';
import {OverlayService} from '../../services/overlay.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChatService} from '../../services/chat.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-group-view',
    templateUrl: './group-view.component.html',
    styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit, OnDestroy {
    @Input() group;
    @Input() messages;

    replying = false;
    user = this.store.selectForLocal('user');
    overlays$ = this.store.select<any>('overlays');

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
            'media paste'
        ],
        toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist | removeformat |visualblocks',
    };

    constructor(
        private store: Store,
        private overlayService: OverlayService,
        private chatService: ChatService,
        private toastr: ToastrService,
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        const chatStore = this.store.selectForLocal('chatStore');
        chatStore.group = undefined;
        chatStore.groupToOpen = undefined;
        this.store.set('chatStore', chatStore);
        console.log('destroyed');
    }

    reply() {
        this.replying = true;
        window.scrollTo(0, 0);
    }

    back() {
        const chatStore = this.store.selectForLocal('chatStore');
        chatStore.group = undefined;
        this.store.set('chatStore', chatStore);
    }

    send() {
        // const replyingTo = {
        //     isNew: false,
        //     groupId: this.group.id,
        //     name: this.group.name,
        // };
        // const chatStore = this.store.selectForLocal('chatStore');
        // chatStore.replyingTo = replyingTo;
        // this.store.set('chatStore', chatStore);
        //
        // this.overlayService.toggle('mailCompose');

        const chatStore = this.store.selectForLocal('chatStore');
        this.message.mail = true;
        this.message.createdAt = new Date();
        this.message.groupId = this.group.id;
        this.message.user = {
            id: this.user.id,
            name: this.user.contact.firstname + ' ' + this.user.contact.surname,
            companyId: '',
        };
        if (this.user.company) {
            this.message.user.company = this.user.company.id;
        }
        console.log(this.message);
        chatStore.messages.push(JSON.parse(JSON.stringify(this.message)));
        this.store.set('chatStore', chatStore);

        this.chatService.sendChat(this.message);
        this.message.content = '';
        this.refreshChat();

    }

    refreshChat() {
        setTimeout(() => {
            this.chatService.getGroups().subscribe();
            // this.close();
        }, 1000);
    }

    sortBy(prop: string) {
        return this.messages.reverse();
        // return this.messages.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    }

    searchUsers() {
        this.overlayService.toggle('mailUserSearch');
    }

    addUser(e) {
        const chatUser = {
            userId: e.id,
            contactName: e.name,
        };
        this.group.users.push(chatUser);
        this.chatService.addUser(this.group.id, e.id).subscribe(data => {
            this.toastr.success('', `${e.name} added this chat`);
        })
        console.log('adding', e);
    }

    removeUser(e) {
        for (let i  = 0; i < this.group.users.length; i++) {
            if (this.group.users[i].userId === e.id) {
                this.group.users.splice(i, 1);
                this.chatService.removeUser(this.group.id, e.id).subscribe(data => {
                    this.toastr.success('', `${e.name} removed from this chat`);
                })
            }
        }
        console.log('removing', e);
    }

}
