import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MailGroupsComponent} from './mail-groups/mail-groups.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from '../../environments/environment';
import {DirectivesModule} from '../directives/directives.module';
import { MailComposeComponent } from './mail-compose/mail-compose.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { MailGroupsListComponent } from './mail-groups-list/mail-groups-list.component';
import { MailCategoriesComponent } from './mail-categories/mail-categories.component';
import { MailUserSearchComponent } from './mail-user-search/mail-user-search.component';
import {UserModule} from '../user/user.module';

const config: SocketIoConfig = {url: environment.socketPath, options: {}};


@NgModule({
    declarations: [
        MailGroupsComponent,
        MailComposeComponent,
        GroupViewComponent,
        MailGroupsListComponent,
        MailCategoriesComponent,
        MailUserSearchComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        UserModule,
        DirectivesModule,
        SocketIoModule.forRoot(config),
    ]
})
export class MailModule {
}
