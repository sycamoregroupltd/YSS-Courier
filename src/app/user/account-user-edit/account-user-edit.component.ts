import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { ToolsService } from '../../services/tools.service';
import { Store } from '../../store';
import { OverlayService } from '../../services/overlay.service';

@Component({
    selector: 'app-account-user-edit',
    templateUrl: './account-user-edit.component.html',
    styleUrls: ['./account-user-edit.component.scss']
})
export class AccountUserEditComponent implements OnInit {
    @Output() completed = new EventEmitter();

    form: FormGroup;
    newUser = false;
    newUserId = '';
    newContactId = '';

    user = {
        id: '',
        username: '',
        password: '',
        extendedExpiration: false,
        accountType: 'customer',
        terms: false,
        marketing: false,
        contact: {
            id: '',
            userId: '',
            firstname: '',
            surname: '',
            email: '',
            mobile: '',
            landline: '',
            avatar: '',
            jobTitle: '',
            addressId: '',
            companyId: '',
        },
        company: undefined,
        address: undefined
    };

    constructor(
        private overlayService: OverlayService,
        private store: Store,
        private fb: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        private toolsService: ToolsService,
    ) {
        this.form = this.fb.group({
            accountType: ['customer', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
            terms: [false, []],
            marketing: [false, []],
            contact: fb.group({
                firstname: ['', [Validators.required, Validators.minLength(2)]],
                surname: ['', [Validators.required, Validators.minLength(2)]],
                email: ['', [Validators.required, Validators.email]],
                emailConfirm: ['', [Validators.required, Validators.email]],
                mobile: ['', [Validators.pattern('^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$')]],
                landline: ['', [Validators.pattern('^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$')]],
                jobTitle: ['', [Validators.minLength(2)]],
            }),
        });
    }

    ngOnInit(): void {
        this.createPrimaryIds();
        const overlayData = this.store.selectForLocal('overlayData');

        if (overlayData.user) {
            this.newUser = false;

            this.userService.findOne(overlayData.user.id).subscribe(data => {
                this.user = data.data;
                console.log(this.user);

                this.form.patchValue({
                    contact: {
                        firstname: data.data.contact.firstname,
                        surname: data.data.contact.surname,
                        email: data.data.contact.email,
                        mobile: data.data.contact.mobile,
                        landline: data.data.contact.landline,
                        jobTitle: data.data.contact.jobTitle,
                    }
                });

            });
        } else {
            this.newUser = true;
            this.user.accountType = overlayData.accountType;
            if (overlayData.company) {
                this.user.contact.companyId = overlayData.company.id;
            }
        }
    }

    close() {
        this.overlayService.closeAll();
    }

    toggleValue(v) {
        if (!this.user[v]) {
            this.user[v] = true;
        } else {
            this.user[v] = false;
        }
    }

    onSubmit() {
        this.user.username = this.form.value.contact.email;
        this.user.contact.firstname = this.form.value.contact.firstname;
        this.user.contact.surname = this.form.value.contact.surname;
        this.user.contact.email = this.form.value.contact.email;
        this.user.contact.mobile = this.form.value.contact.mobile;
        this.user.contact.landline = this.form.value.contact.landline;
        this.user.contact.jobTitle = this.form.value.contact.jobTitle;

        this.alertService.clearMessage();
        if (this.newUser) {
            this.create();
        } else {
            this.update();
        }
    }

    create() {
        this.userService.createUser(this.user).subscribe(data => {
                this.alertService.notification(['New account added'], 3000);

                this.userService.search().subscribe();
                this.completed.emit();
                this.close();
            },
            (error) => {
                this.alertService.error([error.error.message]);
            });
    }

    update() {
        this.userService.update(this.user).subscribe(data => {
                this.alertService.notification(['Account updated'], 3000);

                this.userService.search().subscribe();
                this.completed.emit();
                this.close();
            },
            (error) => {
                this.alertService.error([error.error.message]);
            });
    }

    createPrimaryIds() {
        this.newUserId = this.toolsService.newUUID();
        this.newContactId = this.toolsService.newUUID();

        this.user.id = this.newUserId;
        this.user.contact.id = this.newContactId;
        this.user.contact.userId = this.newUserId;
    }
}
