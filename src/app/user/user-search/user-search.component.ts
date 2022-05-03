import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Store } from '../../store';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { OverlayService } from '../../services/overlay.service';
import { debounce } from 'lodash';

@Component({
    selector: 'app-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit, OnChanges {
    @Input() company;
    @Input() showCompany = false;

    users = [];
    accountType = 'customer';
    companyUsers$ = this.store.select<any>('companyUsers');

    constructor(
        private store: Store,
        private overlayService: OverlayService,
        private route: ActivatedRoute,
        private userService: UserService,
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {

        this.filterSearch();
        if (this.company) {
            this.accountType = this.company.accountType;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        if (changes.params) {
            this.filterSearch();
        }
    }

    filterSearch() {
        const companyUsers = this.store.selectForLocal('companyUsers');
        companyUsers.params.pages = 0;
        this.store.set('companyUsers', companyUsers);
        this.search();
    }

    search() {
        this.userService.search().subscribe(data => {
            this.users = data.data.data;
        });
    }

    addUser() {
        const overlayData = {
            user: undefined,
            accountType: this.accountType,
            company: this.company,
        };
        this.store.set('overlayData', overlayData);
        this.overlayService.toggle('userEdit');
    }

    editUser(user) {
        console.log(user);
        const overlayData = {
            user,
            accountType: this.accountType,
            company: this.company,
        };
        this.store.set('overlayData', overlayData);
        this.overlayService.toggle('userEdit');

    }

}
