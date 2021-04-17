import { Injectable } from '@angular/core';
import {Reference} from '../../models/reference/reference';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UtilitiesService} from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  referencesSubject = new Subject<any>();
  referenceSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient, private utilitiesService: UtilitiesService) {
  }

  // Fonction pour récupèrer les références
  getReferences(): void{
    this.httpClient.get<Reference>(this.utilitiesService.serverUrl + 'api/references/get').subscribe(
      (references: any) => {
        this.referencesSubject.next(references);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des références';
        this.errorsSubject.next(message);
      }
    );
  }

  // Fonction pour récupèrer le nom de la référence
  getReferenceName(id: number): void{
    this.httpClient.get(this.utilitiesService.serverUrl + 'api/references/getName/' + id).subscribe(
      (name: any) => {
        this.referenceSubject.next(name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de la référence';
        this.errorsSubject.next(message);
      }
    );
  }
}
