import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayService } from '../../services/overlay.service';
import { Store } from '../../store';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { ToolsService } from '../../services/tools.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
    form: FormGroup;

    newUser = false;
    userId = '';

    newAddressId = this.toolsService.newUUID();

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

    address: any = {
        id: this.newAddressId,
        userId: '',
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
        private overlayService: OverlayService,
        private store: Store,
        private fb: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        private toolsService: ToolsService,
        private route: ActivatedRoute,
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
            address: fb.group({
                add1: ['', [Validators.minLength(2)]],
                add2: ['', [Validators.minLength(2)]],
                add3: ['', [Validators.minLength(2)]],
                town: ['', [Validators.minLength(2)]],
                county: ['', [Validators.minLength(2)]],
                postcode: ['', [Validators.minLength(2)]],
                country: ['', [Validators.minLength(2)]],
            }),
        });

    }

    ngOnInit(): void {
        this.userId = this.route.snapshot.params.id;

        this.userService.findOne(this.userId).subscribe(data => {
            this.user = data.data;

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
            if (data.data.address) {
                this.form.patchValue({
                    address: {
                        add1: data.data.address.add1,
                        add2: data.data.address.add2,
                        add3: data.data.address.add3,
                        town: data.data.address.town,
                        county: data.data.address.county,
                        postcode: data.data.address.postcode,
                        country: data.data.address.country,
                    }
                });
            }

        });

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

        if (this.form.value.address.add1 !== '') {
            if (this.user.address) {
                this.user.address.add1 = this.form.value.address.add1;
                this.user.address.add2 = this.form.value.address.add2;
                this.user.address.add3 = this.form.value.address.add3;
                this.user.address.town = this.form.value.address.town;
                this.user.address.county = this.form.value.address.county;
                this.user.address.postcode = this.form.value.address.postcode;
                this.user.address.country = this.form.value.address.country;
            } else {
                this.user.address = {
                    add1: this.form.value.address.add1,
                    add2: this.form.value.address.add2,
                    add3: this.form.value.address.add3,
                    town: this.form.value.address.town,
                    county: this.form.value.address.county,
                    postcode: this.form.value.address.postcode,
                    country: this.form.value.address.country,
                };
            }
        }
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
                this.close();
            },
            (error) => {
                this.alertService.error([error.error.message]);
            });
    }

    update() {
        this.userService.update(this.user).subscribe(data => {
                this.alertService.notification(['Account updated'], 3000);
                this.close();
            },
            (error) => {
                this.alertService.error([error.error.message]);
            });
    }

    navigationChange(e) {
    }
}
