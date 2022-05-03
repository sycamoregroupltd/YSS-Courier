import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'app-companies-list',
    templateUrl: './companies-list.component.html',
    styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {
    @Input() params;

    users = [];

    constructor(
        private userService: UserService,
        public chatService: ChatService,
    ) {
    }

    ngOnInit(): void {
        this.search();
    }

    setSort(v) {
        this.params.sort = v;
        this.params.page = 0;
        this.search();
    }

    search() {
        this.userService.searchCompanies(this.params).subscribe(data => {
            this.users = data.data.data;

            this.params.pages = Math.ceil(data.totalRecords / this.params.limit);
            this.params.totalRecords = data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }

        });
    }
}
