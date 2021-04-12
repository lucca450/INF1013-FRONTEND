import { Injectable } from '@angular/core';
import {Sector} from '../../models/sector/sector';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UtilitiesService} from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  sectorsSubject = new Subject<any>();
  sectorSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient, private utilitiesService: UtilitiesService) {
  }
  // Fonction pour récupérer tous les secteurs
  getSectors(): void{
    this.httpClient.get<Sector>(this.utilitiesService.serverUrl + 'sectors/get').subscribe(
      (sectors: any) => {
        this.sectorsSubject.next(sectors);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des secteurs';
        this.errorsSubject.next(message);
      }
    );
  }
  // Fonction pour récupèrer le nom d'un secteur
  getSectorName(id: number): void{
    this.httpClient.get(this.utilitiesService.serverUrl + 'sectors/getName/' + id).subscribe(
      (name: any) => {
        this.sectorSubject.next(name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération du secteur';
        this.errorsSubject.next(message);
      }
    );
  }


}
