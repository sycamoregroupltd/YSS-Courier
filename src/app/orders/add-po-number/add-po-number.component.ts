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

export interface PoNumberAlertData extends CustomAlertData {
  showPoNumberModal: boolean;
  poNumber?: string;
}

@Component({
  selector: "app-add-po-number",
  templateUrl: "./add-po-number.component.html",
  styleUrls: ["./add-po-number.component.scss"],
})
export class AddPoNumberComponent implements AfterViewInit {
  @Output() confirm = new EventEmitter<PoNumberAlertData>();
  @Output() cancel = new EventEmitter<PoNumberAlertData>();

  public poNumberForm = this._formBuilder.group({
      poNumber: [null, [Validators.required, Validators.maxLength(10)]],
  });

  @ViewChild("poNumberTemplate")
  poNumberTemplate: TemplateRef<AddPoNumberComponent>;

  private _poNumberAlertData: PoNumberAlertData;

  constructor(
      private _alertService: AlertService,
      private _formBuilder: FormBuilder
  ) {}

  ngAfterViewInit(): void {
    console.log('view');
      this._poNumberAlertData = {
          ...DefaultCustomAlertData,
          template: this.poNumberTemplate,
          cancelText: "Cancel",
          confirmText: "Ok",
          confirmCb: this._confirmPoNumberModal.bind(this),
          canConfirmCb: this._canCancel.bind(this),
          cancelCb: this._cancelPoNumberModal.bind(this),
          showPoNumberModal: true,
      };

      this._alertService.customAlert(this._poNumberAlertData);
  }

  private _confirmPoNumberModal() {
      this._poNumberAlertData.poNumber =
          this.poNumberForm.controls.poNumber.value;
      this._poNumberAlertData.showPoNumberModal = false;
      this.confirm.emit(this._poNumberAlertData);
  }

  private _cancelPoNumberModal() {
      this._poNumberAlertData.showPoNumberModal = false;
      this.confirm.emit(this._poNumberAlertData);
  }

  private _canCancel() {
      return (
          this.poNumberForm.dirty &&
          this.poNumberForm.valid &&
          this.poNumberForm.controls.poNumber.value !== ""
      );
  }
}
