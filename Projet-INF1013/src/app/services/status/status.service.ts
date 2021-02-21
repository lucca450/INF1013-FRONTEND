import { Injectable } from '@angular/core';
import {Status} from '../../models/status/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  status: Status[];
  constructor() {
    this.status = this.mockStatusData();
  }
  // Fonction pour générer les données lié aux status
  private mockStatusData(): Status[]{
    return[
      {interfaceName: 'Status', id : 0, name : 'Clientèle'},
      {interfaceName: 'Status', id : 1, name : 'Employés réguliers'}
    ];
  }
  // Fonction pour récupérer le statut à partir de son identifiant
  public getStatusFromID(id: number): Status {
    let status: Status;
    status = this.status.find(function(s: Status) {
      return s.id === id;
    });
    return status;
  }
}