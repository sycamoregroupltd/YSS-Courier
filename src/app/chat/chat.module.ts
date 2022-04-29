import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material.module';
import {SharedModule} from '../shared/shared.module';
import { ChatComponent } from './chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {environment} from '../../environments/environment';

const config: SocketIoConfig = { url: environment.socketPath, options: {}};

@NgModule({
    declarations: [
        ChatComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        SocketIoModule.forRoot(config)
    ],
    exports: [
        ChatComponent
    ],
    // providers: [
    //     Store,
    // ],
})
export class ChatModule {}
