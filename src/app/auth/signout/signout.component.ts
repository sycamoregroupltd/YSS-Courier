import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private router: Router,
      private notificationService: NotificationService,
      private chatService: ChatService,
  ) { }

  ngOnInit(): void {
  }

  signOut() {
      this.notificationService.stopListening();
      this.authService.logout();
      this.authService.clearAuthTimeout();
      this.router.navigate(['/']);

  }
}
