import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-password-reset-confirmation',
    templateUrl: './password-reset-confirmation.component.html',
    styleUrls: ['./password-reset-confirmation.component.scss']
})
export class PasswordResetConfirmationComponent implements OnInit {

    confirmationEmail = '';

    constructor(
        private store: Store,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.confirmationEmail = this.store.selectForLocal('confirmationEmail');
    }

    signIn() {
        this.router.navigate(['/login']);
    }

    home() {
        this.router.navigate(['/']);
    }
}
