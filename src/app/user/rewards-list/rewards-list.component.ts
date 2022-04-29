import {Component, OnInit} from '@angular/core';
import {Store} from '../../store';
import {RewardService} from '../../services/reward.service';
import {debounce} from 'lodash';

@Component({
    selector: 'app-rewards-list',
    templateUrl: './rewards-list.component.html',
    styleUrls: ['./rewards-list.component.css']
})
export class RewardsListComponent implements OnInit {
    user;
    rewards = [];
    params: any = {
        searchTerm: '',
        limit: 25,
        limits: [25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'reward_triggered.createdAt DESC',
        sorts: [],
    };

    constructor(
        private store: Store,
        private rewardService: RewardService
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        this.user = this.store.selectForLocal('user');
        if (this.user.company) {
            this.params.companyId = this.user.company.id;
        } else {
            this.params.userId = this.user.id;
        }
        this.filterSearch();
    }

    filterSearch() {
        this.params.page = 0;
        this.getRewardsTriggered();
    }


    getRewardsTriggered() {
        this.rewardService.rewardsTriggered(this.params).subscribe(data => {
            this.rewards = data.data.data;
        });
    }

}
