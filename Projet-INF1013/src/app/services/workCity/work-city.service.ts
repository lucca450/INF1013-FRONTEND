import { Injectable } from '@angular/core';
import {WorkCity} from '../../models/workCity/work-city';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DepartureReason} from '../../models/departureReason/departure-reason';

@Injectable({
  providedIn: 'root'
})
export class WorkCityService {

  workCitiesSubject = new Subject<any>();
  workCitySubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient) {
  }

  getWorkCities(){
    this.httpClient.get<WorkCity>(`http://localhost:3000/workCities`).subscribe(
      (workCities: any) => {
        this.workCitiesSubject.next(workCities);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des raisons des villes';
        this.errorsSubject.next(message);
      }
    )
  }

  getWorkCityName(id: number){
    this.httpClient.get<WorkCity>(`http://localhost:3000/workCities/`+id).subscribe(
      (workCity: any) => {
        this.workCitySubject.next(workCity.name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de la ville;';
        this.errorsSubject.next(message);
      }
    )
  }
}
