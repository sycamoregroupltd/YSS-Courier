import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';
import { OverlayService } from '../../services/overlay.service';
import { UserService } from '../../services/user.service';
import { BasketService } from '../../services/basket.service';
import { AuthService } from '../../services/auth.service';
import { ToolsService } from '../../services/tools.service';
import { ChatService } from '../../services/chat.service';
import { NotificationService } from '../../services/notification.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-register-modal',
    templateUrl: './register-modal.component.html',
    styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {

    registrationComplete = false;
    newUser;
    newCompany;

    constructor(
        private store: Store,
        private alertService: AlertService,
        private overlayService: OverlayService,
        private userService: UserService,
        private authService: AuthService,
        private toolsService: ToolsService,
        private basketService: BasketService,
        private chatService: ChatService,
        private notificationService: NotificationService,
    ) {
    }

    ngOnInit(): void {
    }

    registered(e) {
        this.newUser = e.user;
        this.newCompany = e.company;

        this.alertService.clearMessage();
        if (e.user.accountType === 'customer') {
            this.authService.login(e.user).subscribe(
                data => {
                    this.userService.getByToken().subscribe(userData => {
                        this.chatService.receiveChat();
                        this.notificationService.listenToNotifications();
                        this.close();
                    });
                },
                error => {
                });
        } else {
            // TODO need to handle adding address for the trade account
            this.registrationComplete = true;
        }
    }

    updatedDetails(e) {
        this.alertService.clearMessage();
        this.close();
    }

    signIn() {
        this.overlayService.toggle('loginModal');
    }

    close() {
        this.overlayService.closeAll();
    }
}
