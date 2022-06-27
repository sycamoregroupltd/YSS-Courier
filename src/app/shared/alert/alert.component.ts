import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { Store } from '../../store';
import { AlertService } from '../../services/alert.service';
import { AlertData } from '../../data-types/alert-data';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent
{
    @Input() data: AlertData;

    @Input() set showModal(value: any)
    {
        if (!value) {
            setTimeout(() => this._gone = !value, 150);
        } else {
            this._gone = !value;
        }
        setTimeout(this.alignAlertBox.bind(this), 5);
        this._showModal = !!value;
    }

    @Output() setStep = new EventEmitter();
    @Output() confirmAction = new EventEmitter();

    public _showModal = false;
    public _gone = false;
    public marginTop = '-171px';

    @HostBinding('attr.class') get classes()
    {
        return this.data.customCss;
    }

    @ViewChild('templateCont') templCont: ElementRef<HTMLElement>;

    constructor(
        private store: Store,
        private alertService: AlertService
    )
    {
    }

    close()
    {
        this.alertService.clearMessage();
        if (this.data.confirmAction && this.data.confirmAction.cancelCb) {
            this.data.confirmAction.cancelCb(this.data.confirmAction.data);
        }
        if (this.data.customAlert && this.data.customAlert.cancelCb) {
            this.data.customAlert.cancelCb(this.data.customAlert.data);
        }
        if (this.data.resolve) {
            this.data.resolve('Alert closed');
        }
    }

    confirm()
    {
        if (this.data.customAlert && this.data.customAlert.canConfirmCb && this.data.customAlert.canConfirmCb() !== true) {
            return; // do nothing if it's not valid yet
        }

        this.alertService.clearMessage();
        if (this.data.confirmAction && this.data.confirmAction.confirmCb) {
            this.data.confirmAction.confirmCb(this.data.confirmAction.data);
        }
        if (this.data.customAlert && this.data.customAlert.confirmCb) {
            this.data.customAlert.confirmCb(this.data.customAlert.data);
        }
        if (this.data.resolve) {
            this.data.resolve('Alert closed');
        }
    }

    private alignAlertBox()
    {
        if (this.templCont) {
            const estimated = getComputedStyle(this.templCont.nativeElement);
            this.marginTop = '-' + ((parseInt(estimated.height, 10) / 2) + 117) + 'px';
        }
    }
}
