import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';
import { ChatService } from '../../services/chat.service';
import { OverlayService } from '../../services/overlay.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mail-groups',
    templateUrl: './mail-groups.component.html',
    styleUrls: ['./mail-groups.component.scss']
})
export class MailGroupsComponent implements OnInit {
    user$ = this.store.select<any>('user');
    user = this.store.selectForLocal('user');
    chatStore$ = this.store.select<any>('chatStore');
    overlays$ = this.store.select<any>('overlays');
    overlayData;

    messages = [];
    groups = [];
    categories = [];
    filtering;
    activeFolder;
    composing;

    chatParams = {
        searchTerm: '',
        userId: '',
        limit: 25,
        limits: [25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'chat_groups.createdAt DESC',
        sorts: [],
    };

    constructor(
        private store: Store,
        private router: Router,
        public chatService: ChatService,
        private overlayService: OverlayService,
    ) {
        // this.searchMessagesFromUserGroups = debounce(this.searchMessagesFromUserGroups, 350);
    }

    ngOnInit(): void {
        console.log(this.user);
        console.log(this.store.selectForLocal('chatStore'));
        this.getCategories();
        this.getGroups();

    }

    getGroups() {
        this.chatService.getGroups().subscribe();
    }

    searchMail() {
        // this.clearFilters();
        this.filtering = true;
        this.clearGroup();
        this.chatParams.userId = this.user.id;
        this.chatService.searchMessagesFromUserGroups(this.chatParams).subscribe(data => {
            this.groups = data.data.data;
        });
    }

    compose() {
        const chatStore = this.store.selectForLocal('chatStore');
        chatStore.replyingTo = undefined;
        this.store.set('chatStore', chatStore);
        this.composing = true;
    }

    finishedNewMessage(e) {
        this.composing = false;
    }

    clearGroup() {
        const chatStore = this.store.selectForLocal('chatStore');
        chatStore.group = undefined;
        chatStore.replyingTo = undefined;
        this.store.set('chatStore', chatStore);
    }

    viewFolder(folder) {
        this.clearGroup();
        this.setFilter('inbox', true, 'inbox');
    }

    clearFilters() {
        this.groups = [];
        this.filtering = undefined;
        this.activeFolder = undefined;
        this.chatParams.searchTerm = '';
        this.clearGroup();
    }

    setFilter(type, value, folder) {
        this.chatParams.searchTerm = '';
        this.filtering = { type, value };
        this.activeFolder = folder;
        this.clearGroup();
        this.doFilter();
    }

    doFilter() {
        const chatStore = this.store.selectForLocal('chatStore');
        if (this.filtering) {
            this.groups = chatStore.groups.filter((group) => {
                if (this.filtering.type === 'category') {
                    if (group.category) {
                        return group.category.id === this.filtering.value;
                    }
                }
                if (this.filtering.type === 'important') {
                    return group.important;
                }
                if (this.filtering.type === 'archived') {
                    return group.archived;
                }
                if (this.filtering.type === 'sent') {
                    return group.isSender;
                }
                if (this.filtering.type === 'inbox') {
                    return !group.isSender;
                }
            });
        }

    }

    searchMessagesFromUserGroups() {
        this.chatService.searchMessagesFromUserGroups(this.chatParams).subscribe(data => {
        });
    }


    getCategories() {
        this.chatService.getCategories().subscribe(data => {
            this.categories = data.data;
        });
    }
}
