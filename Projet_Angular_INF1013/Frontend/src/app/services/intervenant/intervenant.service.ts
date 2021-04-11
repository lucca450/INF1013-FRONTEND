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
  intervenantVerifyUsernameSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private router: Router, private httpClient: HttpClient, private utilitiesService: UtilitiesService) {
  }

  /* Pas utilisé, mais peut-être plus tard
  // Fonction pour récupérer tous les intervenants
  getAllIntervenants(): void{
    this.httpClient.get<User>(`http://localhost:3000/users`).subscribe(
      (intervenants: any) => {
        this.emitIntervenantsSubject(intervenants);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des intervenants';
        this.emitErrorsSubject(message);
      }
    );
  }

   */

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

  sendEmail(username): void{
    /*
    const transporter = nodemailer.createTransport(
      `smtps://<username>%40gmail.com:<password>@smtp.gmail.com`
    );

    const mailOptions = {
      from : 'from_test@gmail.com',
      to : 'pierro_kool@hotmail.com',
      subject : 'Hello',
      text: 'Hello from node.js'
    };

    transporter.sendMail( mailOptions, (error, info) => {
      if (error) {
        return console.log(`error: ${error}`);
      }
      console.log(`Message Sent ${info.response}`);
    });

     */

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

// Fonction pour activier ou désactiver un utilisateur
ActiveDesactiveIntervenant(id: number, activeDesactive: boolean): void
{
  const headers = { 'content-type': 'application/json'};
  const body = JSON.stringify({active: activeDesactive});
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
  this.httpClient.get<User>(`http://localhost:3000/users/` + id).subscribe(
    (intervenant: any) => {
      const fullname = intervenant.fname + ' ' + intervenant.lname;
      this.intervenantsFullnameSubject.next(fullname);
    },
    (error) => {
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
