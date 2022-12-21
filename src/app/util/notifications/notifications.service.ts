import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _notification: ToastrService) { }

  success(arg: string, title?: string) {
    this._notification.success(arg, (title ? ' - ' + title : 'Succès'));
  }

  error(arg: string, title?: string) {
    this._notification.error(arg, (title ? ' - ' + title : 'Erreur'));
  }

  info(arg: string, title?: string) {
    this._notification.info(arg, (title ? ' - ' + title : 'Information'));
  }

  warning(arg: string, title?: string) {
    this._notification.warning(arg, (title ? ' - ' + title : 'Attention'));
  }
}
