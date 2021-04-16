import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../models/users/user';
import {UtilitiesService} from '../utilities/utilities.service';
// import * as nodemailer from 'nodemailer';


// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class IntervenantService {

  activateDesactivateSubject = new Subject<any>();
  intervenantsSubject = new Subject<any>();
  intervenantSubject = new Subject<any>();
  intervenantsFullnameSubject = new Subject<any>();
  intervenantEditPasswordSubject = new Subject<any>();
  intervenantVerifyUsernameSubject = new Subject<any>();
  emailSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  resetPasswordSubject = new Subject<any>();
  constructor(private router: Router, private httpClient: HttpClient, private utilitiesService: UtilitiesService) {
  }

  // Fonction pour rcéupèrer tout les intervenants
  getAllIntervenants(): void{
    this.httpClient.get(this.utilitiesService.serverUrl + 'users/getAll').subscribe(
      (users: any) => {
        this.emitIntervenantsSubject(users);
      },
      (error) => {
        this.emitErrorsSubject('Une erreur s\'est produite avec le serveur lors de la récupérations des utilisateurs. ' +
          'Veuillez réessayer plus tard.');
      }
    );
  }

  // Fonction pour récupèrer un intervenant à partir de son identifiant
  getIntervenantFromId(id: number): void{
    console.log('try to get user');
    this.httpClient.get<User>(this.utilitiesService.serverUrl + 'users/get/' + id).subscribe(
      (intervenant: any) => {
        this.intervenantSubject.next(intervenant);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de l\'intervenant';
        this.emitErrorsSubject(message);
      }
    );
  }

  // Fonction pour récupèrer tous les intervenants actifs
  getActiveIntervenants(): void{
  this.httpClient.get<User>(this.utilitiesService.serverUrl + 'users/active/get').subscribe(
      (users: any) => {
        this.emitIntervenantsSubject(users);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des utilisateurs. Veuillez réessayer plus tard (getActiveIntervenants).';
        this.emitErrorsSubject(message);
      }
    );
  }

  // Fonction pour ajouter un intervenant
  addIntervenant(user: User): void{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(user);

   // console.log(headers);
    console.log(body);

    this.httpClient.post(this.utilitiesService.serverUrl + 'users/add', body, {headers}).subscribe(
      (data: any) => {
        this.emitIntervenantsSubject(data);
        this.goToMainRoute();
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de l\'ajout de l\'intervenant. Veuillez réessayer plus tard';
        this.emitErrorsSubject(error.error);
      }
    );
}

  sendEmail(email: string, username: string, password: string, firstname: string, lastname: string): void{
    const headers = { 'content-type': 'application/json'};
    this.httpClient.post(this.utilitiesService.serverUrl + 'users/send-mail/' + email + '/' + username + '/' + password +
      '/' + firstname + '/' + lastname, {}, {headers}).subscribe(
      (data: any) => {
        this.emailSubject.next(data);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de l\'envoie du courriel. Veuillez réessayer plus tard';
        console.log('erreur hmmmm');
        console.log(error.error);
        this.emitErrorsSubject(message);
      }
    );
  }


// Fonction pour modifier un intervenant
editIntervenant(intervenant: User): void{
  const headers = { 'content-type': 'application/json'};
  const body = JSON.stringify(intervenant);
  this.httpClient.put(this.utilitiesService.serverUrl + 'users/edit', body, {headers}).subscribe(
    (data: any) => {
      this.emitIntervenantsSubject(data);
      this.goToMainRoute();
    },
    (error) => {
      const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des intervenants2';
      this.emitErrorsSubject(message);
    }
  );
}

// Fonction pour modifier un mot de passe
  editPasswordIntervenant(id: number, password: string): void{
    const headers = { 'content-type': 'application/json'};
    this.httpClient.post(this.utilitiesService.serverUrl + 'users/editPassword/' + id + '/' + password, {}, {headers}).subscribe(
      (data: any) => {
        this.router.navigate(['person']);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors du changement de mot de passe. Veuillez réessayer plus tard.';
        this.emitErrorsSubject(message);
      }
    );
  }

  skipFirstStepConnexion(id: number): void {
    const headers = { 'content-type': 'application/json'};
    this.httpClient.post(this.utilitiesService.serverUrl + 'users/skipFirstStepConnexion/' + id, {}, {headers}).subscribe(
      (data: any) => {
        this.router.navigate(['person']);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de cette demande. Veuillez réessayer plus tard.';
        this.emitErrorsSubject(message);
      }
    );

  }



// Fonction pour activier ou désactiver un utilisateur
ActiveDesactiveIntervenant(id: number, activeDesactive: boolean): void
{
  const headers = { 'content-type': 'application/json'};
  this.httpClient.patch(this.utilitiesService.serverUrl + 'users/activeDesactive/' + id + '/' + activeDesactive, {}, {headers}).subscribe(
    (user: any) => {
      this.emitActivateDesactivateSubject(0);
    },
    (error) => {
      const message = 'Un erreur au niveau du serveur est survenu lors de la suppression de l\'intervenant. Veuillez réessayer plus tard';
      this.emitErrorsSubject(message);
    }
  );
}

// Fonction pour retourner à la route principale
private goToMainRoute(): void{
  this.router.navigate(['intervenant']);
}

// Fonction pour récupérer le nom complet de l'intervenant à partir de son identifiant
public intervenantFullName(id: number): void {
    console.log('call intervenantFullName');
    this.httpClient.get(this.utilitiesService.serverUrl + 'users/getFullName/' + id).subscribe(
    (fullName: string) => {
      console.log('We have the name');
      console.log(name);
      this.intervenantsFullnameSubject.next(fullName);
    },
    (error) => {
      console.log('error');
      console.log(error.error);
      const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des intervenants';
      this.emitErrorsSubject(message);
    }
  );
}

// Fonction pour récupérer le nom complet de l'intervenant à partir de son identifiant
  public verifyUsernameExist(username: string): void {
    this.httpClient.get(this.utilitiesService.serverUrl + 'users/verifyName/' + username).subscribe(
      (data: any) => {
        if (data === true){
          this.intervenantVerifyUsernameSubject.next(true);
        }
        else{
          this.emitErrorsSubject('Ce nom d\'utilsateur existe déja');
        }

      },
      (error) => {
        this.emitErrorsSubject(error.error);
      }
    );
  }


  ResetPasswordIntervenant(user: User): void {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(user);
    this.httpClient.post(this.utilitiesService.serverUrl + 'users/resetPassword', body, {headers}).subscribe(
      (data: any) => {
        this.resetPasswordSubject.next(data);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la rénitialisation du mot de passe del\'intervenant. Veuillez réessayer plus tard';
        this.emitErrorsSubject(message);
      }
    );
  }
  // Fonction annuler l'étape concernant l'intervenant
  cancelIntervenant(): void {
    this.router.navigate(['intervenant']);
  }
  /* Fonctions qui l'émission des données */
   emitIntervenantsSubject(intervenants: any): void {
    this.intervenantsSubject.next(intervenants);
  }

  private emitErrorsSubject(message: string): void {
    this.errorsSubject.next(message);
  }

  private emitActivateDesactivateSubject(id: number): void{
    this.activateDesactivateSubject.next(id);
  }
}
