import { Injectable } from '@angular/core';
import {Status} from '../../models/status/status';
import {City} from '../../models/city/city';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  status: Status[];
  constructor() {
    this.status = this.mockStatusData();
  }

  private mockStatusData(): Status[]{
    return[
      {interfaceName: 'Status', id : 0, name : 'Clientèle'},
      {interfaceName: 'Status', id : 1, name : 'Employés réguliers'}
    ];
  }

  public getStatusFromID(id: number): Status {
    let status: Status;
    status = this.status.find(function(s: Status) {
      return s.id === id;
    });
    return status;
  }
}
