import {Component, OnInit} from '@angular/core';
import {Store} from '../../store';
import {UserService} from '../../services/user.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    env = environment;
    overlays$ = this.store.select<any>('overlays');

    step = 'dashboard';
    user;

    constructor(
        private store: Store,
        private userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.userService.getByToken().subscribe(userData => {
            this.user = userData.data;
        });
    }

    navigationChange(e) {
        this.step = e;
    }
}
