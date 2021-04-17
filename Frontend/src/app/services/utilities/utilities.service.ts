import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SuccessMessageComponent} from '../../component/utilities/message/success-message/success-message.component';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  serverUrl = 'http://localhost:8080/api/';
  constructor(private snackBar: MatSnackBar) { }

  // Fonction pour gèrer la snackbar qui affiche "Opération éffetué avec succès".
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

  // Fonction pour récupérer un nombre aléatoite de nombre et de chiffre
  randomNumberAndLetter(): string{
    return Math.random().toString(36).slice(-16);
  }
}
