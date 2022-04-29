import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '../../store';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToolsService } from '../../services/tools.service';
import { BasketService } from '../../services/basket.service';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
    @Input() referralCode;
    @Input() isBasketAuth = false;
    @Output() registrationComplete = new EventEmitter();
    @Output() switchToSignIn = new EventEmitter();

    form: FormGroup;

    validReferralCode = true;
    tradeAccount = false;

    accountTypes = [
        { id: 'customer', name: 'Customer' },
        { id: 'supplier', name: 'Supplier' },
        { id: 'trade', name: 'Trade' },
        { id: 'courier', name: 'Courier' },
    ];

    newUserId = '';
    newContactId = '';
    newCompanyId = '';
    newAddressId = '';

    user = {
        id: this.newUserId,
        username: '',
        password: '',
        extendedExpiration: false,
        accountType: 'customer',
        terms: false,
        marketing: false,
        referralCode: '',
        contact: {
            id: this.newContactId,
            userId: this.newUserId,
            addressId: '',
            companyId: '',
            firstname: '',
            surname: '',
            email: '',
            mobile: '',
            landline: '',
            jobTitle: '',
            avatar: '',
        },
    };

    company: any = {
        id: this.newCompanyId,
        primaryUserId: this.newUserId,
        accountType: '',
        addressId: '',
        name: '',
        url: '',
        email: '',
        mobile: '',
        landline: '',
        companyNumber: '',
        vatNumber: '',
        restrictions: '',
    };

    address: any = {
        id: this.newAddressId,
        userId: this.newUserId,
        add1: '',
        add2: '',
        add3: '',
        town: '',
        county: '',
        country: '',
        postcode: '',
        defaultDeliveryAddress: true,
        isBilling: true,
    };

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        private router: Router,
        private authService: AuthService,
        private toolsService: ToolsService,
        private basketService: BasketService
    ) {
        this.form = this.fb.group({
            accountType: ['customer', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordConfirm: ['', []],
            terms: [false, []],
            marketing: [false, []],
            contact: fb.group({
                firstname: ['', [Validators.required, Validators.minLength(2)]],
                surname: ['', [Validators.required, Validators.minLength(2)]],
                email: ['', [Validators.required, Validators.email]],
                emailConfirm: ['', []],
                mobile: ['', [Validators.required, Validators.minLength(7)]],
                landline: ['', [Validators.minLength(7)]],
                jobTitle: ['', [Validators.minLength(2)]],
            }),
            address: fb.group({
                add1: ['', [Validators.minLength(2)]],
                add2: ['', [Validators.minLength(2)]],
                add3: ['', [Validators.minLength(2)]],
                town: ['', [Validators.minLength(2)]],
                county: ['', [Validators.minLength(2)]],
                postcode: ['', [Validators.minLength(2)]],
            }),
            company: fb.group({
                name: ['', [Validators.minLength(2)]],
                url: ['', [Validators.minLength(2)]],
                email: ['', [Validators.email]],
                mobile: ['', [Validators.minLength(7)]],
                landline: ['', [Validators.minLength(7)]],
                companyNumber: ['', [Validators.minLength(2)]],
                vatNumber: ['', [Validators.minLength(2)]],
            }),
        });
    }

    ngOnInit(): void {
        console.log(this.referralCode);

        this.createPrimaryIds();
        this.onChanges();
    }

    checkReferralCode() {
        if (this.form.value.email !== '' && this.referralCode !== '') {
            this.userService
                .checkReferralCode(
                    this.referralCode,
                    this.form.value.contact.email
                )
                .subscribe((data) => {
                    this.validReferralCode = data.data.isValid;
                });
        }
    }

    onChanges() {
        this.form.get('passwordConfirm').valueChanges.subscribe((val) => {
            if (this.form.value.password !== val) {
                this.form.controls.passwordConfirm.setErrors({ '': true });
            }
        });

        // this.form.controls.contact
        //     .get('emailConfirm')
        //     .valueChanges.subscribe((val) => {
        //         const fldRef = this.form.controls.contact.get('emailConfirm');
        //         if (this.form.value.contact.email !== val) {
        //             fldRef.setErrors({ '': true });
        //         }
        //     });

        // this.form.get('accountType').valueChanges.subscribe(val => {
        //     const fldRef = this.form.controls.company.get('name');
        //     if (this.form.value.accountType !== 'customer') {
        //         if (!this.form.value.company.name) {
        //             fldRef.setErrors({'': true});
        //         }
        //     } else {
        //         fldRef.setErrors(null);
        //     }
        // });
    }

    // passwordMatches() {
    //     if (this.form.value.password !== this.form.value.passwordConfirm) {
    //         this.form.controls.passwordConfirm.setErrors({'': true});
    //         return false;
    //     }
    //     return true;
    // }

    toggleValue(v) {
        if (!this.user[v]) {
            this.user[v] = true;
        } else {
            this.user[v] = false;
        }
    }
    toggleTradeAccount() {
        !this.tradeAccount ? this.tradeAccount = true : this.tradeAccount = false;
        if (this.tradeAccount) {
            this.user.accountType = 'trade';
        } else {
            this.user.accountType = 'customer'
        }
        // !this.tradeAccount ?  : this.user.accountType = 'customer';
    }

    onSubmit() {
        this.user.password = this.form.value.password;
        this.user.username = this.form.value.contact.email;

        this.user.contact.firstname = this.form.value.contact.firstname;
        this.user.contact.surname = this.form.value.contact.surname;
        this.user.contact.email = this.form.value.contact.email;
        this.user.contact.mobile = this.form.value.contact.mobile;
        this.user.contact.landline = this.form.value.contact.landline;
        this.user.contact.jobTitle = this.form.value.contact.jobTitle;

        if (this.referralCode && this.validReferralCode) {
            this.user.referralCode = this.referralCode;
        }

        if (this.tradeAccount) {
            this.company.accountType = this.user.accountType;
            this.company.name = this.form.value.company.name;
            this.company.url = this.form.value.company.url;
            this.company.companyNumber = this.form.value.company.companyNumber;
            this.company.vatNumber = this.form.value.company.vatNumber;
            this.company.email = this.form.value.company.email;
            this.company.mobile = this.form.value.company.mobile;
            this.company.landline = this.form.value.company.landline;

            // this.address.add1 = this.form.value.address.add1;
            // this.address.add2 = this.form.value.address.add2;
            // this.address.add3 = this.form.value.address.add3;
            // this.address.town = this.form.value.address.town;
            // this.address.county = this.form.value.address.county;
            // this.address.postcode = this.form.value.address.postcode;
            // this.address.country = this.form.value.address.country;
        }

        this.alertService.clearMessage();
        this.store.set('confirmationEmail', this.user.contact.email);
        this.store.set('accountType', this.user.accountType);
        this.save();
    }

    save() {
        if (this.user.accountType !== 'customer') {
            this.user.contact.addressId = '';
            this.user.contact.companyId = this.newCompanyId;
        }

        console.log(this.user, this.company);
        this.userService.createUser(this.user).subscribe(
            async (userData) => {
                console.log(userData);
                this.user.id = userData.data.id;
                if (this.user.accountType !== 'customer') {

                    this.userService
                        .createCompany(this.company, this.user)
                        .subscribe(
                            (data) => {
                                this.company.id = data.data.id
                                this.registrationComplete.emit({
                                    user: this.user,
                                    company: this.company
                                });
                            },
                            (error) => {
                                this.alertService.error([
                                    error.error.message,
                                ]);
                            }
                        );

                } else {
                    this.registrationComplete.emit({
                        user: this.user,
                        company: undefined
                    });
                }
            },
            (error) => {
                this.alertService.error([error.error.message]);
                console.log(error.error);
            }
        );
    }

    createPrimaryIds() {
        this.newUserId = this.toolsService.newUUID();
        this.newContactId = this.toolsService.newUUID();
        this.newAddressId = this.toolsService.newUUID();
        this.newCompanyId = this.toolsService.newUUID();

        this.user.id = this.newUserId;
        this.user.contact.id = this.newContactId;
        this.user.contact.userId = this.newUserId;

        this.company.id = this.newCompanyId;
        this.company.primaryUserId = this.newUserId;
        this.address.id = this.newAddressId;
    }

    doSignIn() {
        this.switchToSignIn.emit();
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
}
