import { Injectable } from '@angular/core';
import {WorkCity} from '../../models/workCity/work-city';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UtilitiesService} from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class WorkCityService {

  workCitiesSubject = new Subject<any>();
  workCitySubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient, private utilitiesService: UtilitiesService) {
  }

  // Fonction pour récupèrer toutes les villes
  getWorkCities(): void{
    this.httpClient.get<WorkCity>(this.utilitiesService.serverUrl + 'api/workCities/get').subscribe(
      (workCities: any) => {
        this.workCitiesSubject.next(workCities);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des raisons des villes';
        this.errorsSubject.next(message);
      }
    );
  }

  // Fonction pour récupère le nom de la ville
  getWorkCityName(id: number): void{
    this.httpClient.get(this.utilitiesService.serverUrl + 'api/workCities/getName/' + id).subscribe(
      (name: any) => {
        this.workCitySubject.next(name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de la ville;';
        this.errorsSubject.next(message);
      }
    );
  }
}
