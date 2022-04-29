import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
    @Input() data;
    @Output() complete = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    confirm() {
        this.complete.emit({action: true});
    }
    cancel() {
        this.complete.emit({action: false});
    }

}
