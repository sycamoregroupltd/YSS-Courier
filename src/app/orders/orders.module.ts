import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { OrderSearchComponent } from './order-search/order-search.component';
import { SharedModule } from '../shared/shared.module';
import { OrderDetailSearchComponent } from './order-detail-search/order-detail-search.component';
import { OrderStatusUpdateComponent } from './order-status-update/order-status-update.component';
// @todo: replace with another date picker
/*import { SatDatepickerModule } from 'saturn-datepicker-ext';*/
import { DirectivesModule } from '../directives/directives.module';
import { OrderAssignComponent } from './order-assign/order-assign.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderBoardSwapSupplierComponent } from './order-board-swap-supplier/order-board-swap-supplier.component';




@NgModule({
    declarations: [
        OrderSearchComponent,
        OrderDetailSearchComponent,
        OrderStatusUpdateComponent,
        OrderAssignComponent,
        
        
    
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        MaterialModule,
        /*SatDatepickerModule,*/
        DirectivesModule,
        NgSelectModule
       
    ],
    exports: [
        OrderSearchComponent,
        OrderDetailSearchComponent,
        OrderStatusUpdateComponent,
        OrderAssignComponent,
        
      
    ]
})
export class OrdersModule {
}
