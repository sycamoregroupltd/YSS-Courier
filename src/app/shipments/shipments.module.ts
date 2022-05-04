import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { ShipmentsListComponent } from './shipments-list/shipments-list.component';
import { ShipmentVehicleComponent } from './shipment-vehicle/shipment-vehicle.component';

@NgModule({
    declarations: [
        ShipmentsListComponent,
        ShipmentVehicleComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [
        ShipmentsListComponent,
    ]
})
export class ShipmentsModule {
}
