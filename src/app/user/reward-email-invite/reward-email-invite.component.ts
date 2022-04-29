import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RewardService} from '../../services/reward.service';
import {Store} from '../../store';
import {OverlayService} from '../../services/overlay.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-reward-email-invite',
  templateUrl: './reward-email-invite.component.html',
  styleUrls: ['./reward-email-invite.component.css']
})
export class RewardEmailInviteComponent implements OnInit {
    @Output() refreshData = new EventEmitter();

    emails = [];

  constructor(
      private rewardService: RewardService,
      private store: Store,
      private overlayService: OverlayService,
      private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
      this.addAnother();
  }

  close() {
      this.overlayService.closeAll();
  }

  checkForUser(email) {

  }

  addAnother() {
      this.emails.push({email: ''});
  }

  remove(idx) {
      this.emails.splice(idx, 1);
  }

  send() {
      const user = this.store.selectForLocal('user');
      this.rewardService.inviteUserByEmail(this.emails, user).subscribe(data => {
            this.toastrService.success('Great! Your invites have been sent');
            this.refreshData.emit();
            this.close();
      });

  }

}
