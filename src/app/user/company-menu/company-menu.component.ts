import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '../../store';
import { OverlayService } from '../../services/overlay.service';

@Component({
    selector: 'app-company-menu',
    templateUrl: './company-menu.component.html',
    styleUrls: ['./company-menu.component.scss']
})
export class CompanyMenuComponent implements OnInit {

    @Input() user;
    @Output() navigationChange = new EventEmitter();

    step = 'dashboard';
    overlays$ = this.store.select<any>('overlays');
    overlayData;

    constructor(
        private store: Store,
        private overlayService: OverlayService,
    ) {
    }

    ngOnInit(): void {
    }

    setStep(v) {
        this.step = v;
        this.navigationChange.emit(v);
    }

    editUser() {
        this.store.set('userToEdit', this.store.selectForLocal('user'));
        this.setStep('user-edit');
    }

    addUser() {
        this.store.set('userToEdit', this.store.selectForLocal('user'));
        this.setStep('user-edit');
    }

    requestCreate() {
        this.overlayData = {
            id: '',
            companyId: '',
            createdBy: '',
            type: 0,
            message: '',
        };

        this.store.set('overlayData', this.overlayData);
        this.overlayService.toggle('requestCreate');
    }
}
