import { Injectable } from '@angular/core';
import {Status} from '../../models/status/status';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  allStatusSubject = new Subject<any>();
  statusSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient) {
  }

  getStatus(){
    this.httpClient.get<Status>(`http://localhost:3000/status`).subscribe(
      (allStatus: any) => {
        this.allStatusSubject.next(allStatus);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des status';
        this.errorsSubject.next(message);
      }
    )
  }

  getStatusName(id: number){
    this.httpClient.get<Status>(`http://localhost:3000/status/`+id).subscribe(
      (status: any) => {
        this.statusSubject.next(status.name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération du status';
        this.errorsSubject.next(message);
      }
    )
  }
}
