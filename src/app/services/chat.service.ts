import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Store} from '../store';
import { Socket } from 'ngx-socket-io';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OverlayService} from './overlay.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    env = environment;

    constructor(
        private store: Store,
        private socket: Socket,
        private apiService: ApiService,
        private http: HttpClient,
        private overlayService: OverlayService,
        private toastr: ToastrService,
    ) {
    }

    sendChat(message) {
        console.log(message);
        this.socket.emit('chat', message);
    }

    receiveChat() {
        this.getGroups().subscribe();
        this.socket.fromEvent('chat').subscribe((message: any) => {

            console.log(message);
            const chatStore = this.store.selectForLocal('chatStore');

            for (let i = 0; i < chatStore.groups.length; i++) {
                if (message.groupId === chatStore.groups[i].id) {
                    if (!chatStore.group || (chatStore.groups[i].id !== chatStore.group.id) ) {
                        chatStore.groups[i].unread++;
                    }
                }
            }

            if (chatStore.group) {
                if (message.groupId === chatStore.group.id) {
                    chatStore.messages.push(message);
                    // this.messages.push(message);
                    this.scrollBottom();
                }
            }

            chatStore.unread = 0;
            chatStore.groups.forEach(g => {
                chatStore.unread = +chatStore.unread + +g.unread;
            });
            this.store.set('chatStore', chatStore);

            this.getGroups().subscribe();

        });
        // return this.socket.fromEvent('chat');
    }

    getUsers() {
        return this.socket.fromEvent('users');
    }

    doesGroupExist(recipient) {
        const user = this.store.selectForLocal('user');
        const dataToSend = {
            recipient,
            sender: user.id
        };
        return this.http.post(this.env.apiPath + 'chat/group/checkexists', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getByGroupId(groupId) {
        return this.http.get(this.env.apiPath + 'chat/' + groupId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        const chatStore = this.store.selectForLocal('chatStore');
                        chatStore.messages = data.data;
                        this.store.set('chatStore', chatStore);

                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getGroups() {
        const user = this.store.selectForLocal('user');
        return this.http.get(this.env.apiPath + 'chat/groups/' + user.id, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        const chatStore = this.store.selectForLocal('chatStore');
                        chatStore.groups = data.data;
                        chatStore.unread = 0;
                        chatStore.groups.forEach(g => {
                            if (+g.unread > 0) {
                                chatStore.unread = +chatStore.unread + +g.unread;
                            }
                        });
                        // if (data.data.length) {
                        //     chatStore.group = data.data[0];
                        // }
                        this.store.set('chatStore', chatStore);
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    markAsRead(groupId) {
        const user = this.store.selectForLocal('user');
        return this.http.delete(this.env.apiPath + 'chat/' + groupId + '/' + user.id, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    searchMessagesFromUserGroups(params) {
        const user = this.store.selectForLocal('user');
        const dataToSend = {
            params,
            user
        };
        return this.http.post(this.env.apiPath + 'chat/messages/search', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }




    searchUsers(params) {
        const dataToSend = {
            params,
        };
        return this.http.post(this.env.apiPath + 'chat/users/search', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );

    }

    addUser(groupId, userId) {
        const dataToSend = {
            groupId,
            userId
        };
        return this.http.post(this.env.apiPath + 'chat/user/add', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );

    }

    removeUser(groupId, userId) {
        const dataToSend = {
            groupId,
            userId
        };
        return this.http.post(this.env.apiPath + 'chat/user/remove', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                    return data;
                }, catchError(this.apiService.handleError))
            );

    }

    getCategories() {
        return this.http.get(this.env.apiPath + 'chat/categories', this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    toggleImportant(groupId, userId, important) {
        const dataToSend = {
            groupIds: [groupId],
            userId,
            important,
        };
        return this.http.post(this.env.apiPath + 'chat/important', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    toggleArchived(groupId, userId, archived) {
        const dataToSend = {
            groupIds: [groupId],
            userId,
            archived,
        };
        return this.http.post(this.env.apiPath + 'chat/archived', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    setCategory(groupId, userId, categoryId) {
        const dataToSend = {
            groupIds: [groupId],
            userId,
            categoryId,
        };
        return this.http.post(this.env.apiPath + 'chat/category', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }
    removeCategory(groupId, userId) {
        const dataToSend = {
            groupIds: [groupId],
            userId,
        };
        return this.http.post(this.env.apiPath + 'chat/category/remove', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    scrollBottom() {
        const typeBox = document.getElementById('chat-content-holder');
        if (typeBox) {
            console.log(typeBox.scrollHeight);
            setTimeout(() => typeBox.scrollTo(0, typeBox.scrollHeight), 200);
        }
    }

    startChatGroup(recipient, recipientType) {
        const sender = this.store.selectForLocal('user');
        const dataToSend = {
            sender,
            senderType: '',
            recipient,
            recipientType,
        };

        if (sender.company) {
            dataToSend.senderType = 'company';
        } else {
            dataToSend.senderType = 'customer';
        }

        return this.http.post(this.env.apiPath + 'chat/group/checkexists', dataToSend, this.apiService.getHttpOptions())
            .subscribe((data: any) => {
                    console.log(data);
                    const chatStore = this.store.selectForLocal('chatStore');
                    chatStore.groupToOpen = data.data.groupId;
                    this.store.set('chatStore', chatStore);
                    const overlays = this.store.selectForLocal('overlays');
                    if (!overlays.chat) {
                        this.overlayService.toggle('chat');
                    }
                },
                catchError(this.apiService.handleError)
            );
    }

    startChatGroupFromWithinChat(recipient, recipientType) {
        const sender = this.store.selectForLocal('user');
        const dataToSend = {
            sender,
            senderType: '',
            recipient,
            recipientType,
        };

        if (sender.company) {
            dataToSend.senderType = 'company';
        } else {
            dataToSend.senderType = 'customer';
        }

        return this.http.post(this.env.apiPath + 'chat/group/checkexists', dataToSend, this.apiService.getHttpOptions())
            .pipe(map((data: any) => {
                    console.log(data);
                    return data;
                },
                catchError(this.apiService.handleError)
            ));
    }

}
