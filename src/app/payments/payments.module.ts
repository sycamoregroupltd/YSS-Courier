import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material.module';
import {SharedModule} from '../shared/shared.module';
import {PaymentSearchComponent} from './payment-search/payment-search.component';

@NgModule({
    declarations: [
        PaymentSearchComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
    ],
    exports: [
        PaymentSearchComponent,
    ],
    // providers: [
    //     Store,
    // ],
})
export class PaymentsModule {}
