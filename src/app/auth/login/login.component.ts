import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../../store';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    params: any;

    constructor(
        private router: Router,
        private store: Store,
    ) {
    }

    ngOnInit() {
        if (this.store.selectForLocal('user')) {
            this.router.navigate(['/account']);
        }
    }

    authenticated(e) {
        this.router.navigate(['/account']);
    }
}
