import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-password-set',
    templateUrl: './password-set.component.html',
    styleUrls: ['./password-set.component.scss']
})
export class PasswordSetComponent implements OnInit {
    form: FormGroup;

    resetData = {
        password: '',
        autoId: ''
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private fb: FormBuilder,
    ) {
        this.form = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
        });

    }

    ngOnInit(): void {
        this.resetData.autoId = this.route.snapshot.params.Id;
    }

    onSubmit() {
        this.resetData.password = this.form.value.password;
        this.authService.passwordSet(this.resetData).subscribe(data => {
            this.router.navigate(['/password', 'confirmation']);
        });
    }

}
