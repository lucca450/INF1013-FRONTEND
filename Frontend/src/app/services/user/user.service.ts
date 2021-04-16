import { Injectable } from '@angular/core';
import {User} from '../../models/users/user';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UtilitiesService} from '../utilities/utilities.service';
import {test} from 'fuzzy';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  UserFromIdSubject = new Subject<User>();
  userSubject = new Subject<User>(); // L'utilisateur connecté
  user: User;
  isAuth = false;
  usersSubject = new Subject<any>(); // Les utilisateurs
  verifySubjectError = new Subject<string>(); // S'il y a une erreur, elle est envoyé à ceux qui se souscris
  authSubject: Subject<boolean> = new Subject<boolean>(); // Détermine si l'utilisateur est connecté ou déconnecté.

  constructor(private httpClient: HttpClient, private router: Router, private utilitiesService: UtilitiesService) {
  }

  verifyUserExist(username: string, password: string): void{
    this.httpClient.get<User>(`http://localhost:3000/users?active=true&username=` + username + '&password=' + password).subscribe(
      (user: any) => {
        if (user.length > 0){
          this.signIn(user[0]);
        }
        else{
          this.emitError('Le nom d\'utilisateur ou le mot de passe est invalide.');
        }

      },
      (error) => {
        this.emitError('Erreur de communication avec le serveur ! veuillez réessayer plus tard.');
      }
    );
  }

  public login(username: string, password: string): void {
    const body = {username, password};
    this.httpClient.post('http://localhost:8080/login', body,{observe: 'response'}).subscribe(
      (token: any) => {

        console.log('Le token que je set: ');
        const testToken = token.headers.get('Authorization');
        console.log(testToken);
      //  console.log(token);
        localStorage.setItem('token', testToken);
        this.getUserFromName(username);
      },
      (error) => {
        if (error.status !== 403){
          this.emitError('Erreur de communication avec le serveur ! veuillez réessayer plus tard.');
        }
        else{
          this.emitError('Nom d\'utilisateur ou mot de passe invalide.');
        }
      }
    );
  }

  // Fonction pour récupèrer le nom de l'éducation
  getUserFromName(username: string): void{
    this.httpClient.get(this.utilitiesService.serverUrl + 'users/getUserFromName/' + username).subscribe(
      (user: any) => {
        this.signIn(user[0]);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de l\'utilisateur.' +
                        'Veuillez réessayer plus tard';
        this.emitError(message);
      }
    );
  }

/*
  // Fonction pour se connecter
  verifyUserExist(username: string, password: string): void{
    this.httpClient.get<User>(this.utilitiesService.serverUrl + 'users/verifySignin/' + username + '/' + '&password=' + password).subscribe(
      (user: any) => {
        if (user.length > 0){
          this.signIn(user[0]);
        }
        else{
          this.emitError('Le nom d\'utilisateur ou le mot de passe est invalide.');
        }

      },
      (error) => {
        this.emitError('Erreur de communication avec le serveur ! veuillez réessayer plus tard.');
      }
    );
  }


 */



  /* Émission des données  */
   emitUsersSubject(user: User): void {
    this.usersSubject.next(user);
  }

  emitUserFromIdSubject(user: User): void {
    this.UserFromIdSubject.next(user);
  }

  private emitUserSubject(user: User): void {
    this.userSubject.next(user);
  }
  private emitError(error: string): void{
    this.verifySubjectError.next(error);
  }
  /* Fonction pour gèrer lorsqu'on émet les données pour que les autres
   qui écoute le sujet soit au courant lorsque l'utilisateur est connecté ou déconnecté.*/
  emitAuthSubject(isauth: boolean): void {
    this.authSubject.next(isauth);
  }

  // Fonction pour gèrer la déconnection
  signOut(): void {
    this.emitAuthSubject(false);
  }
  // Fonction pour gèrer la connection
  private signIn(user: any): void{
    this.user = user;
    this.isAuth = true;
    this.emitAuthSubject(this.isAuth);
    this.emitUserSubject(this.user);
    // Si l'utilisateur c'est ça première connexion, on le redirige vers la page pour changer son mot de passe.
    // Sinon, on l'envoie vers la page principale
    this.verifyRouteRedirect(user);
  }

  private verifyRouteRedirect(user: User): void{
    if (user.firstConnexion === true){
      this.router.navigate(['person']);
    }
    else{
      this.router.navigate(['intervenant/login/editPassword', user.id]);
    }
  }
}
