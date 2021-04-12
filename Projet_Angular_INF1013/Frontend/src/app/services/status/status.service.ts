import { Injectable } from '@angular/core';
import {Status} from '../../models/status/status';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UtilitiesService} from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  allStatusSubject = new Subject<any>();
  statusSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient, private utilitiesService: UtilitiesService) {
  }

  // Fonction pour récupèrer les status
  getStatus(): void{
    this.httpClient.get<Status>(this.utilitiesService.serverUrl + 'status/get').subscribe(
      (allStatus: any) => {
        this.allStatusSubject.next(allStatus);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des status';
        this.errorsSubject.next(message);
      }
    );
  }

  // Fonction pour récupèrer le nom du statut
  getStatusName(id: number): void{
    this.httpClient.get(this.utilitiesService.serverUrl + 'status/get/' + id).subscribe(
      (name: any) => {
        this.statusSubject.next(name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération du status';
        this.errorsSubject.next(message);
      }
    );
  }
}
