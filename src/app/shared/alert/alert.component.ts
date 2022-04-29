import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Store} from '../../store';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() data;
  @Output() setStep = new EventEmitter();
  @Output() confirmAction = new EventEmitter();

  constructor(
    private store: Store,
    private alertService: AlertService,
  ) { }

  ngOnInit(
  ) {
  }

  close() {
    this.alertService.clearMessage();
  }

  confirm() {
    this.confirmAction.emit(true);
    this.close();
  }

}
