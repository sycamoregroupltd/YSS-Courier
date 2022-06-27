import { ProductModule } from '../product/product.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { DashboardCourierComponent } from '../dashboards/dashboard-courier/dashboard-courier.component';
import { AccountUsersComponent } from './account-users/account-users.component';
import { AccountUserEditComponent } from './account-user-edit/account-user-edit.component';
import { AccountProductsComponent } from './account-products/account-products.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { AccountHeaderComponent } from './account-header/account-header.component';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { CustomerMenuComponent } from './customer-menu/customer-menu.component';
import { CompanyMenuComponent } from './company-menu/company-menu.component';
import { OrdersModule } from '../orders/orders.module';
import { CourierOverviewComponent } from './courier-overview/courier-overview.component';
import { SharedModule } from '../shared/shared.module';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AccountOrderOverviewComponent } from './account-order-overview/account-order-overview.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { CourierDeliveryZonesComponent } from './courier-delivery-zones/courier-delivery-zones.component';
import { CourierDeliveryZoneEditComponent } from './courier-delivery-zone-edit/courier-delivery-zone-edit.component';
import {
    CourierDeliveryZonePostcodesComponent
} from './courier-delivery-zone-postcodes/courier-delivery-zone-postcodes.component';
import { CourierVehiclesComponent } from './courier-vehicles/courier-vehicles.component';
import { CourierVehicleComponent } from './courier-vehicle/courier-vehicle.component';
import { CourierVehiclesSliderComponent } from './courier-vehicles-slider/courier-vehicles-slider.component';
import { ShipmentsModule } from '../shipments/shipments.module';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { PaymentsModule } from '../payments/payments.module';
import { AccountPaymentsComponent } from './account-payments/account-payments.component';
import { RequestsComponent } from './requests/requests/requests.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderSamplesComponent } from './order-samples/order-samples.component';
import { AreasCoveredComponent } from './areas-covered/areas-covered.component';
import { CompanyAreaManageComponent } from './company-area-manage/company-area-manage.component';
import { RewardsSummaryComponent } from './rewards-summary/rewards-summary.component';
import { RewardGiftTypeSelectionComponent } from './reward-gift-type-selection/reward-gift-type-selection.component';
import { RewardEmailInviteComponent } from './reward-email-invite/reward-email-invite.component';
import {
    CourierSupplierCollectionComponent
} from './courier-supplier-collection/courier-supplier-collection.component';
import { SupplierCouriersComponent } from './supplier-couriers/supplier-couriers.component';
import { CaseStudiesComponent } from './case-studies/case-studies.component';
import { CaseStudyComponent } from './case-study/case-study.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DragulaModule } from 'ng2-dragula';
import { RewardsListComponent } from './rewards-list/rewards-list.component';
import { AccountShipmentOverviewComponent } from './account-shipment-overview/account-shipment-overview.component';
import { ShipmentsBoardComponent } from './shipments-board/shipments-board.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { AccountOrdersMobileComponent } from './account-orders-mobile/account-orders-mobile.component';
import {
    RegistrationAdditionalDetailsComponent
} from './registration-additional-details/registration-additional-details.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { OrderBoardPopupComponent } from './order-board-popup/order-board-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    declarations: [
        AccountComponent,
        RegisterComponent,
        AccountConfirmationComponent,
        DashboardCourierComponent,
        AccountUsersComponent,
        AccountUserEditComponent,
        AccountProductsComponent,
        AccountOrdersComponent,
        AccountHeaderComponent,
        AccountOverviewComponent,
        UserMenuComponent,
        CustomerMenuComponent,
        CompanyMenuComponent,
        CourierOverviewComponent,
        UserSearchComponent,
        UserEditComponent,
        AccountOrderOverviewComponent,
        RegistrationFormComponent,
        CourierDeliveryZonesComponent,
        CourierDeliveryZoneEditComponent,
        CourierDeliveryZonePostcodesComponent,
        CourierVehiclesComponent,
        CourierVehicleComponent,
        CourierVehiclesSliderComponent,
        CompaniesListComponent,
        AccountPaymentsComponent,
        RequestsComponent,
        OrderDetailsComponent,
        OrderSamplesComponent,
        AreasCoveredComponent,
        CompanyAreaManageComponent,
        RewardsSummaryComponent,
        RewardGiftTypeSelectionComponent,
        RewardEmailInviteComponent,
        CourierSupplierCollectionComponent,
        SupplierCouriersComponent,
        CaseStudiesComponent,
        CaseStudyComponent,
        RewardsListComponent,
        AccountShipmentOverviewComponent,
        ShipmentsBoardComponent,
        RegisterModalComponent,
        AccountOrdersMobileComponent,
        RegistrationAdditionalDetailsComponent,
        OrderBoardPopupComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        DropzoneModule,
        OrdersModule,
        SharedModule,
        ShipmentsModule,
        PaymentsModule,
        NgMultiSelectDropDownModule.forRoot(),
        DragulaModule.forRoot(),
        ProductModule,
        AngularSvgIconModule,
        NgbModule
    ],
    exports: [
        AccountComponent,
        RegisterComponent,
        DashboardCourierComponent,
        UserMenuComponent,
        UserEditComponent,
        RegistrationFormComponent,
        CompanyMenuComponent,
        CustomerMenuComponent,
        RegisterModalComponent,
    ]
})
export class UserModule {
}
