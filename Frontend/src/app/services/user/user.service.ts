import { Injectable } from '@angular/core';
import {User} from '../../models/users/user';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UtilitiesService} from '../utilities/utilities.service';
import {LocalStorageService} from '../storage/LocalStorageService ';

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

  constructor(private httpClient: HttpClient, private router: Router, private utilitiesService: UtilitiesService,
              private localStorageService: LocalStorageService) {
  }

  // Fonction pour essayer de se connecter
  public login(username: string, password: string): void {
    const body = {username, password};
    this.httpClient.post('http://localhost:8080/login', body, {observe: 'response'}).subscribe(
      (data: any) => {

        // Récupération du token
        const token  = data.headers.get('authorization');
        this.localStorageService.set('token', token);
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

  // Fonction pour récupèrer le nom de l'utilisateur pour se connecter
  getUserFromName(username: string): void{
    this.httpClient.get(this.utilitiesService.serverUrl + 'users/getUserFromName/' + username).subscribe(
      (user: any) => {
        this.signIn(user);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de l\'utilisateur.' +
                        'Veuillez réessayer plus tard';
        this.emitError(message);
      }
    );
  }

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

  // Fonction pour rediriger l'utilisateur selon si c'est ça première connexion ou non
  private verifyRouteRedirect(user: User): void{
    if (user.firstConnexion === false){
      this.router.navigate(['person']);
    }
    else{
      this.router.navigate(['intervenant/login/editPassword', user.id]);
    }
  }
}
