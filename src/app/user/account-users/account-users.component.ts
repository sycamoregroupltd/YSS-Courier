import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import { debounce } from 'lodash';
import {Store} from '../../store';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-account-users',
  templateUrl: './account-users.component.html',
  styleUrls: ['./account-users.component.css']
})
export class AccountUsersComponent implements OnInit {
    @Output() navigationChange = new EventEmitter();

    env = environment;
    user;
    overlays$ = this.store.select<any>('overlays');

    users = [];

    userParams = {
        company: '',
        name: '',
        email: '',
        jobTitle: '',
        town: '',
        postcode: '',
        mobile: '',
        landline: '',
        status: '',
        freeText: '',
        companyId: '',
        accountType: '',
        limit: 10,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'contacts.firstname',
        sorts: [],
    };

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private store: Store,
    ) {
        const user = this.store.selectForLocal('user');
        this.userParams.companyId = user.company.id;
    }

    ngOnInit(): void {
        this.user = this.store.selectForLocal('user');
        this.store.set('userToEdit', undefined);

    }


}
