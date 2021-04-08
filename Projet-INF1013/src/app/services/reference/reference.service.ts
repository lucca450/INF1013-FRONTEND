import { Injectable } from '@angular/core';
import {Reference} from '../../models/reference/reference';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  referencesSubject = new Subject<any>();
  referenceSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient) {
  }

  // Fonction pour récupèrer les références
  getReferences(): void{
    this.httpClient.get<Reference>(`http://localhost:3000/references`).subscribe(
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
    this.httpClient.get<Reference>(`http://localhost:3000/references/` + id).subscribe(
      (reference: any) => {
        this.referenceSubject.next(reference.name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de la référence';
        this.errorsSubject.next(message);
      }
    );
  }
}
