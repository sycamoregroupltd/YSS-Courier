import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {OverlayService} from '../../services/overlay.service';
import {Store} from '../../store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourierService} from '../../services/courier.service';
import {AlertService} from '../../services/alert.service';
import {ToolsService} from '../../services/tools.service';

@Component({
  selector: 'app-courier-delivery-zone-edit',
  templateUrl: './courier-delivery-zone-edit.component.html',
  styleUrls: ['./courier-delivery-zone-edit.component.css']
})
export class CourierDeliveryZoneEditComponent implements OnInit {
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

    vehicleTypes = [];

    newItem = false;

    item = {
        name: '',
        vehicleType: 0,
        courier: '',
        allowPremium: 1,
        allowTimeslot: 1,
        timeslotCost: 0,
        premiumFull: 0,
        premiumHalf: 0,
        premiumQuarter: 0,
        economyFull: 0,
        economyHalf: 0,
        economyQuarter: 0,
        articFull: 0,
        articHalf: 0,
        hiab: 0,
    };

    constructor(
        private overlayService: OverlayService,
        private store: Store,
        private fb: FormBuilder,
        private courierService: CourierService,
        private alertService: AlertService,
        private toolsService: ToolsService,
    ) {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            vehicleType: [0, [Validators.required]],
            timeslotCost: [0, [Validators.required]],
            premiumFull: [0, [Validators.required]],
            premiumHalf: [0, [Validators.required]],
            premiumQuarter: [0, [Validators.required]],
            economyFull: [0, [Validators.required]],
            economyHalf: [0, [Validators.required]],
            economyQuarter: [0, [Validators.required]],
            articFull: [0, [Validators.required]],
            articHalf: [0, [Validators.required]],
            hiab: [0, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.getVehicleTypes();
        // const overlayData = this.store.selectForLocal('overlayData');
        // console.log(overlayData);
        if (this.overlayData.item) {
            this.newItem = false;

            this.courierService
                .getZone(this.overlayData.item.id)
                .subscribe((data) => {
                    this.item = data.data;
                    console.log(this.item);

                    this.form.patchValue({
                        name: data.data.name,
                        vehicleType: data.data.vehicleType,
                        timeslotCost: data.data.timeslotCost,
                        premiumFull: data.data.premiumFull,
                        premiumHalf: data.data.premiumHalf,
                        premiumQuarter: data.data.premiumQuarter,
                        economyFull: data.data.economyFull,
                        economyHalf: data.data.economyHalf,
                        economyQuarter: data.data.economyQuarter,
                        articFull: data.data.articFull,
                        articHalf: data.data.articHalf,
                        hiab: data.data.hiab
                    });


                });
        } else {
            this.newItem = true;
            this.item.courier = this.overlayData.company.id;
            this.form.patchValue({vehicleType: this.overlayData.vehicleType});
        }
    }


    getVehicleTypes() {
        this.courierService.getVehicleTypes().subscribe(data => {
            this.vehicleTypes = data.data;
        });
    }

    close() {
        this.overlayService.closeAll();
    }

    toggleValue(v) {
        if (!this.item[v]) {
            this.item[v] = true;
        } else {
            this.item[v] = false;
        }
    }

    onSubmit() {

        this.item.name = this.form.value.name;
        this.item.vehicleType = this.form.value.vehicleType;
        this.item.timeslotCost = this.form.value.timeslotCost;
        this.item.premiumFull = this.form.value.premiumFull;
        this.item.premiumHalf = this.form.value.premiumHalf;
        this.item.premiumQuarter = this.form.value.premiumQuarter;
        this.item.economyFull = this.form.value.economyFull;
        this.item.economyHalf = this.form.value.economyHalf;
        this.item.economyQuarter = this.form.value.economyQuarter;
        this.item.articFull = this.form.value.articFull;
        this.item.articHalf = this.form.value.articHalf;
        this.item.hiab = this.form.value.hiab;

        this.alertService.clearMessage();
        if (this.newItem) {
            this.create();
        } else {
            this.update();
        }
    }

    create() {
        this.courierService.createZone(this.item).subscribe(
            (data) => {
                console.log(data);
                this.alertService.notification(['New zone added'], 3000);
                this.refreshData.emit();
                this.close();
            },
            (error) => {
                this.alertService.error([error.error.message]);
            }
        );
    }

    update() {
        this.courierService.updateZone(this.item).subscribe(
            (data) => {
                console.log(data);
                this.alertService.notification(['Zone updated'], 3000);
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

    toggleAllowPremium()  {
        if (!this.item.allowPremium) {
            this.item.allowPremium = 1;
        } else  {
            this.item.allowPremium = 0;
            this.form.patchValue({
                premiumFull: 0,
                premiumHalf: 0,
                premiumQuarter: 0,
            });
        }
    }

    toggleAllowTimeslot()  {
        if (!this.item.allowTimeslot) {
            this.item.allowTimeslot = 1;
        } else  {
            this.item.allowTimeslot = 0;
            this.form.patchValue({
                timeslotCost: 0
            });
        }
    }


}
