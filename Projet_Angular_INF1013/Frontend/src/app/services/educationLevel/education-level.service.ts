import { Injectable } from '@angular/core';
import {EducationLevel} from '../../models/educationLevel/education-level';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UtilitiesService} from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class EducationLevelService {

  educationLevelsSubject = new Subject<any>();
  educationLevelSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient, private utilitiesService: UtilitiesService) {
  }

  // Fonction pour récupèrer toutes les éducations
  getEducationLevels(): void {
    this.httpClient.get<EducationLevel>(this.utilitiesService.serverUrl + 'educationLevels/get').subscribe(
      (educationLevels: any) => {
        this.educationLevelsSubject.next(educationLevels);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des éducations';
        this.errorsSubject.next(message);
      }
    );
  }

  // Fonction pour récupèrer le nom de l'éducation
  getEducationLevelName(id: number): void{
    this.httpClient.get(this.utilitiesService.serverUrl + 'educationLevels/get/' + id).subscribe(
      (name: any) => {
        this.educationLevelSubject.next(name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de l\'éducation';
        this.errorsSubject.next(message);
      }
    );
  }
}
