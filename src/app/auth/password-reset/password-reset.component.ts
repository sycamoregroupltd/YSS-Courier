import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-password-reset",
    templateUrl: "./password-reset.component.html",
    styleUrls: ["./password-reset.component.css"],
})
export class PasswordResetComponent implements OnInit {
    form: FormGroup;

    email = "";
    errorMessage = "";

    constructor(
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        this.errorMessage = "";
        this.email = this.form.value.email;
        this.authService.passwordReset(this.email).subscribe((data) => {
            console.log(data);
            if (data.data.accountFound) {
                this.router.navigate(["/password", "reset", "confirmation"]);
            } else {
                this.errorMessage = data.data.message;
            }
        });
    }

    backToLogin() {
        this.router.navigate(["/login"]);
    }
}
