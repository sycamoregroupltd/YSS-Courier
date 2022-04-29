import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AccountComponent } from './user/account/account.component';
import { AuthGuard } from './guards/auth-guard';
import { AccountConfirmationComponent } from './user/account-confirmation/account-confirmation.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { PasswordResetConfirmationComponent } from './auth/password-reset-confirmation/password-reset-confirmation.component';
import { PasswordSetComponent } from './auth/password-set/password-set.component';
import { PasswordSetConfirmationComponent } from './auth/password-set-confirmation/password-set-confirmation.component';
import { UserGuard } from './guards/user-guard';
import { AccountUsersComponent } from './user/account-users/account-users.component';
import { AccountOrdersComponent } from './user/account-orders/account-orders.component';
import { AccountProductsComponent } from './user/account-products/account-products.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { AccountOrderOverviewComponent } from './user/account-order-overview/account-order-overview.component';
import { AccountPaymentsComponent } from './user/account-payments/account-payments.component';
import { MailGroupsComponent } from './mail/mail-groups/mail-groups.component';
import { RequestsComponent } from './user/requests/requests/requests.component';
import { OrderDetailsComponent } from './user/order-details/order-details.component';
import { OrderSamplesComponent } from './user/order-samples/order-samples.component';
import { AreasCoveredComponent } from './user/areas-covered/areas-covered.component';
import { SupplierCouriersComponent } from './user/supplier-couriers/supplier-couriers.component';
import { CaseStudiesComponent } from './user/case-studies/case-studies.component';
import { CaseStudyComponent } from './user/case-study/case-study.component';
import { RewardsListComponent } from './user/rewards-list/rewards-list.component';
import { AccountShipmentOverviewComponent } from './user/account-shipment-overview/account-shipment-overview.component';
import { ShipmentsBoardComponent } from './user/shipments-board/shipments-board.component';

const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'password/reset', component: PasswordResetComponent, pathMatch: 'full' },
    { path: 'password/reset/confirmation', component: PasswordResetConfirmationComponent, pathMatch: 'full' },
    { path: 'password/set/:Id', component: PasswordSetComponent, pathMatch: 'full' },
    { path: 'password/confirmation', component: PasswordSetConfirmationComponent, pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    { path: 'register/:referralCode', component: RegisterComponent, pathMatch: 'full' },
    { path: 'account/confirmation', component: AccountConfirmationComponent, pathMatch: 'full' },
    { path: 'signout', canActivate: [AuthGuard, UserGuard], component: SignoutComponent, pathMatch: 'full' },
    { path: 'account', canActivate: [AuthGuard, UserGuard], component: AccountComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/users', canActivate: [AuthGuard, UserGuard], component: AccountUsersComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/users/:id', canActivate: [AuthGuard, UserGuard], component: UserEditComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/orders', canActivate: [AuthGuard, UserGuard], component: AccountOrdersComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/orders/:id', canActivate: [AuthGuard, UserGuard], component: AccountOrderOverviewComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/shipments/:id', canActivate: [AuthGuard, UserGuard], component: AccountShipmentOverviewComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/shipments-board', canActivate: [AuthGuard, UserGuard], component: ShipmentsBoardComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/orderdetails', canActivate: [AuthGuard, UserGuard], component: OrderDetailsComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/orderdetails/:id', canActivate: [AuthGuard, UserGuard], component: AccountOrderOverviewComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/ordersamples', canActivate: [AuthGuard, UserGuard], component: OrderSamplesComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/products', canActivate: [AuthGuard, UserGuard], component: AccountProductsComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/payments', canActivate: [AuthGuard, UserGuard], component: AccountPaymentsComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/areas', canActivate: [AuthGuard, UserGuard], component: AreasCoveredComponent, pathMatch: 'full' },
    { path: 'account/mail', canActivate: [AuthGuard, UserGuard], component: MailGroupsComponent, pathMatch: 'full' },
    { path: 'account/requests', canActivate: [AuthGuard, UserGuard], component: RequestsComponent, pathMatch: 'full' },
    { path: 'account/rewards', canActivate: [AuthGuard, UserGuard], component: RewardsListComponent, pathMatch: 'full' },
    { path: 'account/couriers', canActivate: [AuthGuard, UserGuard], component: SupplierCouriersComponent, pathMatch: 'full', data: { protected: true } },
    { path: 'account/casestudies', canActivate: [AuthGuard, UserGuard], component: CaseStudiesComponent, pathMatch: 'full' },
    { path: 'account/casestudies/:id', canActivate: [AuthGuard, UserGuard], component: CaseStudyComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
