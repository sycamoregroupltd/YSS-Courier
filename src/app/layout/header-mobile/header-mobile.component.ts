import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { OverlayService } from '../../services/overlay.service';

@Component({
    selector: 'app-header-mobile',
    templateUrl: './header-mobile.component.html',
    styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit {

    user$ = this.store.select<any>('user');
    basket$ = this.store.select<any>('basket');
    notifications$ = this.store.select<any>('notifications');
    chatStore$ = this.store.select<any>('chatStore');
    settings$ = this.store.select<any>('settings');
    menu$ = this.store.select<any>('menu');
    activeMenuImage = '';

    confirmationData = {
        open: false,
        title: '',
        detail: '',
        data: undefined
    };

    constructor(
        private store: Store,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
        private overlayService: OverlayService,
    ) {
    }

    ngOnInit(): void {
    }

    toggleMenu() {
        this.store.set('mobileMenu', true);
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
        this.authService.logout();
        this.authService.clearAuthTimeout();
        this.router.navigate(['login']);
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
    }
}
