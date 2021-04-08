import { Injectable } from '@angular/core';
import {Sector} from '../../models/sector/sector';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  sectorsSubject = new Subject<any>();
  sectorSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient) {
  }
  // Fonction pour récupérer tous les secteurs
  getSectors(): void{
    this.httpClient.get<Sector>(`http://localhost:3000/sectors`).subscribe(
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
    this.httpClient.get<Sector>(`http://localhost:3000/sectors/` + id).subscribe(
      (sector: any) => {
        this.sectorSubject.next(sector.name);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération du secteur';
        this.errorsSubject.next(message);
      }
    );
  }


}
