import { Injectable } from '@angular/core';
import {ResidenceType} from '../../models/residenceType/residence-type';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UtilitiesService} from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ResidenceTypeService {

  residencesTypeSubject = new Subject<any>();
  residenceTypeSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient, private utilitiesService: UtilitiesService) {
  }
  // Fonction pour récupèrer toutes les types de résidences
  getResidencesType(): void{
    this.httpClient.get<ResidenceType>(this.utilitiesService.serverUrl + 'residencesType/get').subscribe(
      (residencesType: any) => {
        this.residencesTypeSubject.next(residencesType);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des résidences';
        this.errorsSubject.next(message);
      }
    );
  }
  // Fonction pour récupèrer le nom d'une résidence
  getResidencesTypeName(id: number): void{
    this.httpClient.get(this.utilitiesService.serverUrl + 'residencesType/get/' + id).subscribe(
      (name: any) => {
        this.residenceTypeSubject.next(name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de la résidence';
        this.errorsSubject.next(message);
      }
    );
  }
}
