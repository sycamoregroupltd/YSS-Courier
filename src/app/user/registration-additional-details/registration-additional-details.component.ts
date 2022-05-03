import { Router } from '@angular/router';
import { Store } from '../../store';
import { BasketService } from '../../services/basket.service';
import { ToolsService } from '../../services/tools.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-registration-additional-details',
    templateUrl: './registration-additional-details.component.html',
    styleUrls: ['./registration-additional-details.component.scss']
})
export class RegistrationAdditionalDetailsComponent implements OnInit {
    @Input() user;
    @Input() company;
    @Output() updatedDetails = new EventEmitter();

    form: FormGroup;

    address: any = {
        id: '',
        userId: '',
        add1: '',
        add2: '',
        add3: '',
        town: '',
        county: '',
        country: 'GB',
        postcode: '',
        defaultDeliveryAddress: true,
        isBilling: true,
        restrictionsSlope: false,
        restrictionsGravel: false,
        restrictionsBoards: false,
    };

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        private router: Router,
        private authService: AuthService,
        private toolsService: ToolsService,
        private basketService: BasketService,
    ) {
        this.form = this.fb.group({
            add1: ['', [Validators.required, Validators.minLength(2)]],
            add2: ['', [Validators.minLength(2)]],
            add3: ['', [Validators.minLength(2)]],
            town: ['', [Validators.required, Validators.minLength(2)]],
            county: ['', [Validators.required, Validators.minLength(2)]],
            postcode: ['', [Validators.required, Validators.minLength(2)]],
        });
    }

    ngOnInit(): void {
        this.address.userId = this.user.id;
    }

    onSubmit() {
        this.address.id = this.toolsService.newUUID;
        this.address.add1 = this.form.value.add1;
        this.address.add2 = this.form.value.add2;
        this.address.add3 = this.form.value.add3;
        this.address.town = this.form.value.town;
        this.address.county = this.form.value.county;
        this.address.postcode = this.form.value.postcode;
        this.address.country = this.form.value.country;

        this.alertService.clearMessage();
        this.save();
    }

    async save() {
        this.userService.RegistrationAdditionalDetails(this.address, this.company, this.user).subscribe(data => {
            this.updatedDetails.emit();
        });
    }
}
