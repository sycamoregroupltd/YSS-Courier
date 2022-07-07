import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import {
  DefaultCustomAlertData,
  CustomAlertData,
} from "../../data-types/alert-data";
import { AlertService } from "../../services/alert.service";

export interface InvNumberAlertData extends CustomAlertData {
  showInvNumberModal: boolean;
  invNumber?: string;
}
@Component({
  selector: 'app-add-inv-number',
  templateUrl: './add-inv-number.component.html',
  styleUrls: ['./add-inv-number.component.css']
})
export class AddInvNumberComponent implements AfterViewInit {

  @Output() confirm = new EventEmitter<InvNumberAlertData>();
  @Output() cancel = new EventEmitter<InvNumberAlertData>();

  public invNumberForm = this._formBuilder.group({
    invNumber: [null, [Validators.required, Validators.maxLength(10)]],
});
@ViewChild("invNumberTemplate")
invNumberTemplate: TemplateRef<AddInvNumberComponent>;

private _invNumberAlertData: InvNumberAlertData;


constructor(
  private _alertService: AlertService,
  private _formBuilder: FormBuilder
) {}

  ngAfterViewInit(): void {
    this._invNumberAlertData = {
      ...DefaultCustomAlertData,
      template: this.invNumberTemplate,
      cancelText: "Cancel",
      confirmText: "Ok",
      confirmCb: this._confirmInvNumberModal.bind(this),
      canConfirmCb: this._canCancel.bind(this),
      cancelCb: this._cancelInvNumberModal.bind(this),
      showInvNumberModal: true,
  };

  this._alertService.customAlert(this._invNumberAlertData);
  }

  private _confirmInvNumberModal() { 
    this._invNumberAlertData.invNumber =
        this.invNumberForm.controls.invNumber.value;
    this._invNumberAlertData.showInvNumberModal = false;
    this.confirm.emit(this._invNumberAlertData);
  }

  private _cancelInvNumberModal() {
    console.log('12344',this._invNumberAlertData);
    this._invNumberAlertData.showInvNumberModal = false;
    this.cancel.emit(this._invNumberAlertData);
  }

  private _canCancel() {
    return (
        this.invNumberForm.dirty &&
        this.invNumberForm.valid &&
        this.invNumberForm.controls.invNumber.value !== ""
    );
  }

}
