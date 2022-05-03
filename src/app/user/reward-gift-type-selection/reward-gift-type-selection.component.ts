import { Component, Input, OnInit } from '@angular/core';
import { RewardService } from '../../services/reward.service';

@Component({
    selector: 'app-reward-gift-type-selection',
    templateUrl: './reward-gift-type-selection.component.html',
    styleUrls: ['./reward-gift-type-selection.component.scss']
})
export class RewardGiftTypeSelectionComponent implements OnInit {
    @Input() user;

    items = [];

    constructor(
        private rewardService: RewardService
    ) {
    }

    ngOnInit(): void {
        this.getUserGiftTypes();
    }

    getUserGiftTypes() {
        this.rewardService.getUserGiftTypes(this.user.id).subscribe(data => {
            this.items = data.data;
        });
    }

    toggleGiftType(item) {
        if (!item.selected) {
            item.selected = true;
            this.addGiftType(item.id);
        } else {
            item.selected = false;
            this.removeGiftType(item.id);
        }
    }

    addGiftType(typeId) {
        this.rewardService.addUserGiftType(typeId, this.user.id).subscribe(data => {
            this.getUserGiftTypes();
        });
    }

    removeGiftType(typeId) {
        this.rewardService.removeUserGiftType(typeId, this.user.id).subscribe(data => {
            this.getUserGiftTypes();
        });
    }
}
