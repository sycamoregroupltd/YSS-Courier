import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToolsService } from '../../services/tools.service';
import { BasketService } from '../../services/basket.service';
import { ChatService } from '../../services/chat.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    referralCode = '';

    constructor(
        private store: Store,
        private userService: UserService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private toolsService: ToolsService,
        private basketService: BasketService,
        private chatService: ChatService,
        private notificationService: NotificationService,
    ) {
    }

    ngOnInit(): void {
        if (this.route.snapshot.params.referralCode) {
            this.referralCode = this.route.snapshot.params.referralCode;
        }
    }

    registered(user) {
        this.alertService.clearMessage();
        this.authService.login(user).subscribe(
            data => {
                this.userService.getByToken().subscribe(userData => {
                    this.chatService.receiveChat();
                    this.notificationService.listenToNotifications();

                    const navigationHistory = this.store.selectForLocal('navigationHistory');
                    if (navigationHistory.length) {
                        if (navigationHistory[0] !== '/') {
                            this.router.navigate([navigationHistory[0]]);
                        } else {
                            this.router.navigate(['/account/confirmation']);
                        }
                    } else {
                        this.router.navigate(['/account/confirmation']);
                    }

                });
            },
            error => {
                this.router.navigate(['/account/confirmation']);
            });
    }
}
