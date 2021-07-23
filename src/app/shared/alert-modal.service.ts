import { Injectable } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { DialogService } from './dialog.service';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}
//https://ng2-materialize.herokuapp.com/modal
//https://github.com/sherweb/ngx-materialize/blob/master/demo/src/app/modal/modal.component.html
@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private dialogService: DialogService){ }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {

    alert(message);
    //this.dialogService.confirm(message);
    /*
    const bsModalRef: BsModalRef = this.modalservice.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout)
    }
    */
  }
  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }
}
