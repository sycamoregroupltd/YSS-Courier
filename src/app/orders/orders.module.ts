import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { OrderSearchComponent } from './order-search/order-search.component';
import { SharedModule } from '../shared/shared.module';
import { OrderDetailSearchComponent } from './order-detail-search/order-detail-search.component';
import { OrderStatusUpdateComponent } from './order-status-update/order-status-update.component';
import { SatDatepickerModule } from 'saturn-datepicker';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
    declarations: [
        OrderSearchComponent,
        OrderDetailSearchComponent,
        OrderStatusUpdateComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        MaterialModule,
        SatDatepickerModule,
        DirectivesModule,
    ],
    exports: [
        OrderSearchComponent,
        OrderDetailSearchComponent,
        OrderStatusUpdateComponent,
    ]
})
export class OrdersModule {
}
