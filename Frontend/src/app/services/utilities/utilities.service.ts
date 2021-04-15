import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SuccessMessageComponent} from "../../component/utilities/message/success-message/success-message.component";

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  serverUrl = 'http://localhost:8080/api/';
  constructor(private snackBar: MatSnackBar) { }

  openSuccessSnackBar(): void{
    const defaultDurantion = 5;
    const defaultClassColor = 'success-message';
    const defaultHorizontalPosition = 'right';
    const defaultVerticalPosition = 'top';

    this.snackBar.openFromComponent(SuccessMessageComponent, {
      duration: defaultDurantion * 1000,
      panelClass: [defaultClassColor],
      horizontalPosition: defaultHorizontalPosition,
      verticalPosition: defaultVerticalPosition
    });
  }


}
