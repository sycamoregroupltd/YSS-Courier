import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-supplier',
  templateUrl: './dashboard-supplier.component.html',
  styleUrls: ['./dashboard-supplier.component.css']
})
export class DashboardSupplierComponent implements OnInit {
    @Input() user;

    step = 'dashboard';

    constructor() { }

      ngOnInit(): void {
      }

      setStep(v) {
        this.step = v;
      }

}
