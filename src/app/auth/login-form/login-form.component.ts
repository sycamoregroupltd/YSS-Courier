import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";
import { UserService } from "../../services/user.service";
import { NotificationService } from "../../services/notification.service";
import { ChatService } from "../../services/chat.service";

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent implements OnInit {
    @Input() isBasketAuth = false;
    @Output() authenticated = new EventEmitter();
    @Output() switchToRegister = new EventEmitter();
    @Output() forgottenPassword = new EventEmitter();

    form: FormGroup;

    user = {
        username: "",
        password: "",
        extendedExpiration: true,
    };

    passwordValidated = true;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private fb: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private notificationService: NotificationService,
        private chatService: ChatService
    ) {
        this.form = this.fb.group({
            username: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]],
        });
    }

    ngOnInit(): void {
        this.form.get("username").valueChanges.subscribe((value) => {
            this.form.get("password").updateValueAndValidity();
        });
    }

    login() {
        this.alertService.clearMessage();
        this.authService.login(this.user).subscribe(
            (data) => {
                // this.authService.authTimeout();
                this.passwordValidated = true;

                this.userService.getByToken().subscribe((userData) => {
                    if (userData.data.guest) {
                        this.passwordValidated = false;
                        this.form.controls.password.setErrors({
                            incorrect: true,
                        });
                    } else {
                        this.chatService.receiveChat();
                        this.notificationService.listenToNotifications();
                        this.authenticated.emit(true);
                    }
                });
            },
            (error) => {
                this.passwordValidated = false;
                this.form.controls.password.setErrors({ incorrect: true });
            }
        );
    }

    clearPasswordValidated() {
        this.passwordValidated = true;
    }

    toggleExtendedExpiration() {
        if (this.user.extendedExpiration) {
            this.user.extendedExpiration = false;
        } else {
            this.user.extendedExpiration = true;
        }
        console.log(this.user);
    }

    onSubmit() {
        this.user.username = this.form.value.username;
        this.user.password = this.form.value.password;
        this.login();
    }

    findInvalidControls() {
        const invalid = [];
        const controls = this.form.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    }

    doRegistration() {
        this.switchToRegister.emit();
    }

    triggerForgottenPassword() {
        this.forgottenPassword.emit();
        this.router.navigate(["/password", "reset"]);
    }
}
