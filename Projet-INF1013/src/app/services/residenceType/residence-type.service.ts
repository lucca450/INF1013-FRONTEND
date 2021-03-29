import { Injectable } from '@angular/core';
import {ResidenceType} from '../../models/residenceType/residence-type';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResidenceTypeService {

  residencesTypeSubject = new Subject<any>();
  residenceTypeSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient) {
  }

  getResidencesType(){
    this.httpClient.get<ResidenceType>(`http://localhost:3000/residencesType`).subscribe(
      (residencesType: any) => {
        this.residencesTypeSubject.next(residencesType);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des résidences';
        this.errorsSubject.next(message);
      }
    )
  }

  getResidencesTypeName(id: number){
    this.httpClient.get<ResidenceType>(`http://localhost:3000/residencesType/`+id).subscribe(
      (residenceType: any) => {
        this.residenceTypeSubject.next(residenceType.name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de la résidence';
        this.errorsSubject.next(message);
      }
    )
  }
}
