import { Injectable } from '@angular/core';
import {DepartureReason} from '../../models/departureReason/departure-reason';
import {Subject} from 'rxjs';
import {Intervenant} from '../../models/intervenant/intervenant';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartureReasonService {

  departureReasonsSubject = new Subject<any>();
  departureReasonSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient) {
  }

  getDeparturesReason(){
    this.httpClient.get<DepartureReason>(`http://localhost:3000/departureReasons`).subscribe(
      (departureReasons: any) => {
        this.departureReasonsSubject.next(departureReasons);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des raisons de départ';
        this.errorsSubject.next(message);
      }
    )
  }

  getDepartureReasonName(id: number){
    this.httpClient.get<DepartureReason>(`http://localhost:3000/DepartureReason/`+id).subscribe(
      (departureReason: any) => {
        this.departureReasonSubject.next(departureReason.name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de la raison de départ';
        this.errorsSubject.next(message);
      }
    )
  }
}
