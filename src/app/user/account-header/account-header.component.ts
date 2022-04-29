import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.css']
})
export class AccountHeaderComponent implements OnInit {
    @Input() user;
    @Output() navigationChange = new EventEmitter();

    step = 'dashboard';

    constructor() { }

    ngOnInit(): void {
    }

    setStep(v) {
        this.step = v;
        this.navigationChange.emit(v);
    }

}
