import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';
import { CasestudyService } from '../../services/casestudy.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-case-studies',
    templateUrl: './case-studies.component.html',
    styleUrls: ['./case-studies.component.scss']
})
export class CaseStudiesComponent implements OnInit {

    items = [];
    user;
    params = {
        companyId: '',
        excludeId: '',
        limit: 5,
        limits: [5, 10, 15, 25],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'case_study.createdAt DESC',
        sorts: [],
    };

    user$ = this.store.select<any>('user');

    constructor(
        private store: Store,
        private casestudyService: CasestudyService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.user = this.store.selectForLocal('user');
        this.params.companyId = this.user.company.id;
        this.search();
    }

    search() {
        this.casestudyService.search(this.params).subscribe(data => {
            this.items = data.data.data;
            this.params.pages = Math.ceil(data.data.totalRecords / this.params.limit);
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }
        });
    }

    create() {
        this.router.navigate(['/account', 'casestudies', 'new']);
    }

    edit(id) {
        this.router.navigate(['/account', 'casestudies', id]);
    }
}
