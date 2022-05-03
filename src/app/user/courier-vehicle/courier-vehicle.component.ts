import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayService } from '../../services/overlay.service';
import { Store } from '../../store';
import { CourierService } from '../../services/courier.service';
import { AlertService } from '../../services/alert.service';
import { ToolsService } from '../../services/tools.service';

@Component({
    selector: 'app-courier-vehicle',
    templateUrl: './courier-vehicle.component.html',
    styleUrls: ['./courier-vehicle.component.scss']
})
export class CourierVehicleComponent implements OnInit {
    @Input() overlayData;
    @Output() refreshData = new EventEmitter();

    form: FormGroup;

    confirmationData = {
        open: false,
        buttonText: 'Confirm',
        title: '',
        detail: '',
        data: undefined,
    };

    newItem = false;

    item = {
        id: '',
        courier: '',
        type: 0,
        registration: '',
        maxWeight: 0,
        maxPallets: 0,
        vLength: 0,
        vWidth: 0,
        vHeight: 0,
        pricing: 0,
    };

    vehicleTypes = [];
    pricingTypes = [];

    constructor(
        private fb: FormBuilder,
        private overlayService: OverlayService,
        private store: Store,
        private alertService: AlertService,
        private toolsService: ToolsService,
        private courierService: CourierService,
    ) {
        this.form = this.fb.group({
            type: [0, [Validators.required]],
            registration: ['', [Validators.required]],
            maxWeight: [0, [Validators.required]],
            maxPallets: [0, [Validators.required]],
            vLength: [0, [Validators.required]],
            vWidth: [0, [Validators.required]],
            vHeight: [0, [Validators.required]],
            pricing: [0, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.getVehicleTypes();
        this.getPricingTypes();
        if (this.overlayData.item) {
            this.newItem = false;

            this.courierService
                .getVehicle(this.overlayData.item.id)
                .subscribe((data) => {
                    this.item = data.data;
                    this.form.patchValue({
                        type: data.data.type.id,
                        registration: data.data.registration,
                        maxWeight: data.data.maxWeight,
                        maxPallets: data.data.maxPallets,
                        vLength: data.data.vLength,
                        vWidth: data.data.vWidth,
                        vHeight: data.data.vHeight,
                        pricing: data.data.pricing.id,
                    });


                });
        } else {
            this.newItem = true;
            this.item.courier = this.overlayData.company.id;
        }
    }

    getVehicleTypes() {
        this.courierService.getVehicleTypes().subscribe(data => {
            this.vehicleTypes = data.data;
        });
    }

    getPricingTypes() {
        this.courierService.getPricingTypes().subscribe(data => {
            this.pricingTypes = data.data;
        });
    }

    close() {
        this.overlayService.closeAll();
    }

    onSubmit() {
        this.item.type = this.form.value.type;
        this.item.pricing = this.form.value.pricing;
        this.item.registration = this.form.value.registration;
        this.item.maxWeight = this.form.value.maxWeight;
        this.item.maxPallets = this.form.value.maxPallets;
        this.item.vLength = this.form.value.vLength;
        this.item.vWidth = this.form.value.vWidth;
        this.item.vHeight = this.form.value.vHeight;

        this.alertService.clearMessage();
        if (this.newItem) {
            this.item.id = this.toolsService.newUUID();
            this.create();
        } else {
            this.update();
        }
    }

    create() {
        this.courierService.createVehicle(this.item).subscribe(
            (data) => {
                console.log(data);
                this.alertService.notification(['New vehicle added'], 3000);
                this.refreshData.emit();
                this.close();
            },
            (error) => {
                this.alertService.error([error.error.message]);
            }
        );
    }

    update() {
        this.courierService.updateVehicle(this.item).subscribe(
            (data) => {
                console.log(data);
                this.alertService.notification(['Vehicle updated'], 3000);
                this.refreshData.emit();
                this.close();
            },
            (error) => {
                this.alertService.error([error.error.message]);
            }
        );
    }

    confirmCancel() {
        this.confirmationData.title = 'Are you sure you want to cancel?';
        this.confirmationData.data = {};
        this.confirmationData.detail = '';
        this.confirmationData.open = true;
    }

    confirmationComplete(e) {
        this.confirmationData.open = false;
        if (e.action) {
            this.close();
        } else {
        }
    }
}
