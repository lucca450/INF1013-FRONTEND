import { Injectable } from '@angular/core';
import {EducationLevel} from '../../models/educationLevel/education-level';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EducationLevelService {

  educationLevelsSubject = new Subject<any>();
  educationLevelSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient) {
  }

  getEducationLevels(){
    this.httpClient.get<EducationLevel>(`http://localhost:3000/educationLevels`).subscribe(
      (educationLevels: any) => {
        this.educationLevelsSubject.next(educationLevels);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des éducations';
        this.errorsSubject.next(message);
      }
    )
  }

  getEducationLevelName(id: number){
    this.httpClient.get<EducationLevel>(`http://localhost:3000/educationLevels/`+id).subscribe(
      (educationLevel: any) => {
        this.educationLevelSubject.next(educationLevel.name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de l\'éducation';
        this.errorsSubject.next(message);
      }
    )
  }
}
