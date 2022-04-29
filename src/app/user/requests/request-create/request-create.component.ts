import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RequestsService} from '../../../services/requests.service';
import {OverlayService} from '../../../services/overlay.service';
import {AlertService} from '../../../services/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '../../../store';
import {ToolsService} from '../../../services/tools.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
    selector: 'app-request-create',
    templateUrl: './request-create.component.html',
    styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
    @Output() refreshData = new EventEmitter();

    form: FormGroup;

    confirmationData = {
        open: false,
        buttonText: 'Confirm',
        title: '',
        detail: '',
        data: undefined,
    };

    newItem = false;
    requestTypes = [];

    item;

    constructor(
        private requestsService: RequestsService,
        private store: Store,
        private alertService: AlertService,
        private fb: FormBuilder,
        private toolsService: ToolsService,
        private overlayService: OverlayService,
        private notificationService: NotificationService,
    ) {
        this.form = this.fb.group({
            type: [0, [Validators.required, Validators.min(1)]],
            message: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.item = this.store.selectForLocal('overlayData');
        const user = this.store.selectForLocal('user');

        if (this.item.id) {
            this.newItem = false;

            this.requestsService
                .get(this.item.id)
                .subscribe((data) => {
                    this.item = data.data;

                    this.form.patchValue({
                        type: data.data.type.id,
                        message: data.data.message,
                    });


                });
        } else {
            this.newItem = true;
            this.item.companyId = user.company.id;
            this.item.createdBy = user.id;
        }

        this.getRequestTypes();
    }

    getRequestTypes() {
        this.requestsService.requestTypes().subscribe(data => {
            this.requestTypes = data.data;
        });
    }

    create() {
        this.requestsService.create(this.item).subscribe(data => {
            console.log(data);

            const user = this.store.selectForLocal('user');
            const notificationData = {
                subject: 'Supplier Request',
                content: `New sample request from  ${user.company.name}`,
                recipient: 'admin',
                requestId: data.data.id,
                internalId: data.data.id,
                type: 'supplier',
            };
            this.notificationService.send(notificationData);


            this.requestsService.search().subscribe();
            this.alertService.notification(['Your request has been sent'], 3000);
            this.close();
        });
    }
    update() {
        this.requestsService.update(this.item).subscribe(data => {
            console.log(data);
            this.alertService.notification(['Your request has been updated'], 3000);
            this.close();
        });
    }

    close() {
        this.overlayService.closeAll();
    }


    onSubmit() {
        this.item.type = this.form.value.type;
        this.item.message = this.form.value.message;

        this.alertService.clearMessage();
        if (this.newItem) {
            this.item.id = this.toolsService.newUUID();
            this.create();
        } else {
            this.update();
        }
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
}
