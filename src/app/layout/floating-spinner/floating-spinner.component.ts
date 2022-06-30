import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-floating-spinner',
  templateUrl: './floating-spinner.component.html',
  styleUrls: ['./floating-spinner.component.scss']
})
export class FloatingSpinnerComponent {
    @Input() showSpinner = false;
}
