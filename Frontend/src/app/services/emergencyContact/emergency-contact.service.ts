import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UtilitiesService} from '../utilities/utilities.service';
import {EmergencyContact} from '../../models/emergency/emergency-contact';

@Injectable({
  providedIn: 'root'
})
export class EmergencyContactService {

  errorsSubject: Subject<string> = new Subject<string>();
  emergencyContactsSubject = new Subject<any>();
  emergencyContactSubject = new Subject<any>();
  constructor(private httpClient: HttpClient, private utilitiesService: UtilitiesService) {}

  // Fonction pour ajouter un contacte d'urgence
  addEmergencyContact(emergencyContact: EmergencyContact): void{
    const body = JSON.stringify(emergencyContact);
    this.httpClient.post(this.utilitiesService.serverUrl + 'emergencyContacts/add', body).subscribe(
      (data: any) => {
        this.emergencyContactsSubject.next(data);
      },
      (error) => {
        this.errorsSubject.next(error.error);
      }
    );
  }

// Fonction pour modifier un contacte d'urgence
  editEmergencyContact(emergencyContact: EmergencyContact): void{
    const body = JSON.stringify(emergencyContact);
    this.httpClient.put(this.utilitiesService.serverUrl + 'emergencyContacts/edit', body).subscribe(
      (data: any) => {
        this.emergencyContactsSubject.next(data);
      },
      (error) => {
        this.errorsSubject.next(error.error);
      }
    );
  }

  // Fonction pour récupérer un contacte d'urgence à partir de son identifiant
  getEmergencyContactById(id: number): void{
    this.httpClient.get<EmergencyContact>(this.utilitiesService.serverUrl + 'emergencyContacts/get/' + id).subscribe(
      (emergencyContact: any) => {
        this.emergencyContactSubject.next(emergencyContact);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de l\'éducation';
        this.errorsSubject.next(message);
      }
    );
  }
}
