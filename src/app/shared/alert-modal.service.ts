import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

  private showAlert(
    message: string,
    type: AlertTypes,
    dismissTimeout?: number
  ) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    dismissTimeout && setTimeout(() => bsModalRef.hide(), dismissTimeout);
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showConfirm(
    title: string,
    message: string,
    cancelBtnTxt?: string,
    confirmBtnTxt?: string
  ) {
    const bsModalRef: BsModalRef = this.modalService.show(
      ConfirmModalComponent
    );
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;
    cancelBtnTxt && (bsModalRef.content.cancelBtnTxt = cancelBtnTxt);
    confirmBtnTxt && (bsModalRef.content.confirmBtnTxt = confirmBtnTxt);

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }


}
