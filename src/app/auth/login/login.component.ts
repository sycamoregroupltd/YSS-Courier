import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { Store } from '../../store';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    params: any;

    constructor(
        private router: Router,
        private store: Store,
    ) {
    }

    ngOnInit() {
        console.log(this.store.selectForLocal('user'))
        if (this.store.selectForLocal('user')) {
            console.log('there is a user')
            this.router.navigate(['/account'])
        } else {
            console.log('no user')
        }
    }

    authenticated(e) {
        this.router.navigate(['/account']);
    }

}
