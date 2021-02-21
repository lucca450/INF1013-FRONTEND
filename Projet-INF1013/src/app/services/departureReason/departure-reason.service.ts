import { Injectable } from '@angular/core';
import {DepartureReason} from '../../models/departureReason/departure-reason';

@Injectable({
  providedIn: 'root'
})
export class DepartureReasonService {

  departureReason: DepartureReason[];
  constructor() {
    this.departureReason = this.mockDepartureReasonData();
  }

  private mockDepartureReasonData(): DepartureReason[]{
    return[
      {interfaceName: 'DepartureReason', id : 0, name : 'Emploi'},
      {interfaceName: 'DepartureReason', id : 1, name : 'Retour aux études'},
      {interfaceName: 'DepartureReason', id : 2, name : 'Problèmes de santé mentale'},
      {interfaceName: 'DepartureReason', id : 3, name : 'Problèmes de santé physique'},
      {interfaceName: 'DepartureReason', id : 3, name : 'Déménagement'},
      {interfaceName: 'DepartureReason', id : 3, name : 'Fin de contrat/projet'},
      {interfaceName: 'DepartureReason', id : 3, name : 'Décès'},
      {interfaceName: 'DepartureReason', id : 3, name : 'Autres'}
    ];
  }

  public getDepartureReasonFromID(id: number): DepartureReason {
    let departureReason: DepartureReason;
    // tslint:disable-next-line:only-arrow-functions typedef
    departureReason = this.departureReason.find(function(d: DepartureReason) {
      return d.id === id;
    });
    return departureReason;
  }
}
