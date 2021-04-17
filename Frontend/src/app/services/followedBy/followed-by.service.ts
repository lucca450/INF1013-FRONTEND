import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UtilitiesService} from '../utilities/utilities.service';
import {FollowedBy} from '../../models/followedBy/followedBy';

@Injectable({
  providedIn: 'root'
})
export class FollowedByService {


  errorsSubject: Subject<string> = new Subject<string>();
  followupsBySubject = new Subject<any>();
  followBySubject = new Subject<any>();
  constructor(private httpClient: HttpClient, private utilitiesService: UtilitiesService) {}

  // Fonction pour ajouter la personne qui va suivre l'intervenant
  addFollowedBy(followedBy: FollowedBy): void{
    const body = JSON.stringify(followedBy);
    this.httpClient.post(this.utilitiesService.serverUrl + 'api/followedBy/add', body).subscribe(
      (data: any) => {
        this.followupsBySubject.next(data);
      },
      (error) => {
        this.errorsSubject.next(error.error);
      }
    );
  }

// Fonction pour modifier la personne qui va suivre l'intervenant
  editFollowedBy(followedBy: FollowedBy): void{
    const body = JSON.stringify(followedBy);
    this.httpClient.put(this.utilitiesService.serverUrl + 'api/followedBy/edit', body).subscribe(
      (data: any) => {
        this.followupsBySubject.next(data);
      },
      (error) => {
        this.errorsSubject.next(error.error);
      }
    );
  }

  // Fonction pour récupérer la personne qui suit l'intervenant
  getFollowedById(id: number): void{
    this.httpClient.get<FollowedBy>(this.utilitiesService.serverUrl + 'api/followedBy/get/' + id).subscribe(
      (followedBy: any) => {
        this.followBySubject.next(followedBy);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de l\'éducation';
        this.errorsSubject.next(message);
      }
    );
  }

}
