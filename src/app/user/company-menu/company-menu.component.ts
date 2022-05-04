import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';
import { OverlayService } from '../../services/overlay.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-company-menu',
    templateUrl: './company-menu.component.html',
    styleUrls: ['./company-menu.component.scss']
})
export class CompanyMenuComponent implements OnInit {
    user;

    step = 'dashboard';
    overlays$ = this.store.select<any>('overlays');
    overlayData;

    constructor(
        private store: Store,
        private overlayService: OverlayService,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.userService.getByToken().subscribe(userData => this.user = userData.data);
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
