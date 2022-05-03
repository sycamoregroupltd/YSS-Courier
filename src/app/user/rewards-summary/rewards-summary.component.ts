import { Component, Input, OnInit } from '@angular/core';
import { RewardService } from '../../services/reward.service';
import { Store } from '../../store';
import { OverlayService } from '../../services/overlay.service';

@Component({
    selector: 'app-rewards-summary',
    templateUrl: './rewards-summary.component.html',
    styleUrls: ['./rewards-summary.component.scss']
})
export class RewardsSummaryComponent implements OnInit {
    @Input() user;

    rewardsSummary;
    rewardTriggers = [];
    overlays$ = this.store.select<any>('overlays');

    constructor(
        private rewardsService: RewardService,
        private store: Store,
        private overlayService: OverlayService,
    ) {
    }

    ngOnInit(): void {
        this.userSummary();
        this.getRewardTriggers();
    }

    userSummary() {
        this.rewardsService.userSummary(this.user.id).subscribe(data => {
            data.data.percOne = ((+data.data.points / +data.data.maxPoints) * 100).toFixed(2);
            data.data.percTwo = (((+data.data.nextLevel - +data.data.points) / +data.data.maxPoints) * 100).toFixed(2);
            this.rewardsSummary = data.data;
        });
    }

    getRewardTriggers() {
        this.rewardsService.rewardTriggersByUser(this.user.id).subscribe(data => {
            this.rewardTriggers = data.data;
        });
    }

    trigger(t) {
        const user = this.store.selectForLocal('user');
        if (t.id === 'google') {
            this.rewardsService.createRewardTrigger(t, user).subscribe(data => {
                this.getRewardTriggers();
            });
            window.open(t.externalUrl, '_blank');
        }
        if (t.id === 'trustpilot') {
            this.rewardsService.createRewardTrigger(t, user).subscribe(data => {
                this.getRewardTriggers();
            });
            window.open(t.externalUrl, '_blank');
        }
    }

    emailInvites() {
        this.overlayService.toggle('rewardEmailInvite');
    }
}
