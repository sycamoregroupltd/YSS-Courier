import { ProductModule } from './product/product.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from './store';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MenuMobileComponent } from './layout/menu-mobile/menu-mobile.component';
import { LoginComponent } from './auth/login/login.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { SignoutComponent } from './auth/signout/signout.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { PasswordSetComponent } from './auth/password-set/password-set.component';
import {
    PasswordResetConfirmationComponent
} from './auth/password-reset-confirmation/password-reset-confirmation.component';
import { PasswordSetConfirmationComponent } from './auth/password-set-confirmation/password-set-confirmation.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { OrdersModule } from './orders/orders.module';
import { SharedModule } from './shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlacesDirective } from './shared/directives/google-places.directive';
import { ShipmentsModule } from './shipments/shipments.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PaymentsModule } from './payments/payments.module';
import { ChatModule } from './chat/chat.module';
import { MailModule } from './mail/mail.module';
import { ToastrModule } from 'ngx-toastr';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';
import { LoginModalComponent } from './auth/login-modal/login-modal.component';
import { RequestCreateComponent } from './user/requests/request-create/request-create.component';
import { HeaderMobileComponent } from './layout/header-mobile/header-mobile.component';
import { FooterMobileComponent } from './layout/footer-mobile/footer-mobile.component';
import { FooterIpadComponent } from './layout/footer-ipad/footer-ipad.component';
import { ConsolePipe } from './pipes/console.pipe';

const firebaseConfig = {
    apiKey: 'AIzaSyAXkVOoH1Z5Nqz0UeG2lMHzY97Kn4JH2xI',
    authDomain: 'yorkstonesupplies-c14b1.firebaseapp.com',
    databaseURL: 'https://yorkstonesupplies-c14b1.firebaseio.com',
    projectId: 'yorkstonesupplies-c14b1',
    storageBucket: 'yorkstonesupplies-c14b1.appspot.com',
    messagingSenderId: '41860333172',
    appId: '1:41860333172:web:c335d9ea493faaea36db21',
    measurementId: 'G-JSDQVZJ3XE',
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MenuMobileComponent,
        LoginComponent,
        LoginModalComponent,
        SignoutComponent,
        PasswordResetComponent,
        PasswordResetConfirmationComponent,
        PasswordSetComponent,
        PasswordSetConfirmationComponent,
        LoginFormComponent,
        GooglePlacesDirective,
        SafeHTMLPipe,
        ConsolePipe,
        RequestCreateComponent,
        HeaderMobileComponent,
        FooterMobileComponent,
        FooterIpadComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        UserModule,
        OrdersModule,
        PaymentsModule,
        ProductModule,
        SharedModule,
        GoogleMapsModule,
        ShipmentsModule,
        ChatModule,
        MailModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        AngularFireStorageModule, // storage
        ToastrModule.forRoot({
            preventDuplicates: true,
            progressBar: true,
            closeButton: true,
        }),
    ],
    providers: [Store],
    exports: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
