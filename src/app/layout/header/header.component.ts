import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { OverlayService } from '../../services/overlay.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    user$ = this.store.select<any>('user');
    basket$ = this.store.select<any>('basket');
    notifications$ = this.store.select<any>('notifications');
    chatStore$ = this.store.select<any>('chatStore');
    settings$ = this.store.select<any>('settings');
    menu$ = this.store.select<any>('menu');
    navigationHistory$ = this.store.select<any[]>('navigationHistory');

    activeMenuImage = '';

    confirmationData = {
        open: false,
        title: '',
        detail: '',
        data: undefined,
    };

    constructor(
        private store: Store,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
        private overlayService: OverlayService,
        private notificationService: NotificationService,
    ) {
    }

    ngOnInit(): void {
    }

    toggleNotifications() {
        this.overlayService.toggle('notifications');
    }

    toggleChat() {
        this.overlayService.toggle('chat');
    }

    register() {
        this.store.set('RegisteredInBasketFlow', false);
        // this.router.navigate(['/register']);
        this.overlayService.toggle('registerModal');
    }

    login() {
        this.overlayService.toggle('loginModal');
    }

    logout() {
        this.notificationService.stopListening();
        this.authService.logout();
        this.authService.clearAuthTimeout();
        this.router.navigate(['/']);
    }

    logoutConfirmation() {
        this.confirmationData.title = 'Are you sure you want to logout?';
        this.confirmationData.data = {};
        this.confirmationData.detail = '';
        this.confirmationData.open = true;
    }

    confirmationComplete(e) {
        this.confirmationData.open = false;
        if (e.action) {
            this.logout();
        } else {
        }
    }

    closeSubMenu(menuItem) {
        menuItem.open = false;
        // this.activeMenuImage = '';
    }

    setActiveMenuImage(menuItem, subMenuItem, trigger) {
        if (trigger === 'menuTrigger') {
            const menu = this.store.selectForLocal('menu');

            menu.home.forEach((o) => {
                o.open = false;
            });
            menuItem.open = true;
        }
        if (subMenuItem) {
            if (trigger === 'menuTrigger' && !this.activeMenuImage) {
                this.activeMenuImage = subMenuItem.imageUrl;
            }
            if (trigger === 'optionTrigger' && this.activeMenuImage) {
                this.activeMenuImage = subMenuItem.imageUrl;
            }
        }
    }
}
