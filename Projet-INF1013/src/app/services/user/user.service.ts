import { Injectable } from '@angular/core';
import {User} from '../../models/users/user';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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

  constructor(private httpClient: HttpClient, private router: Router) {
  }
  // Fonction pour rcéupèrer tout les utilisateurs
  getUsers(): void{
    this.httpClient.get<User>(`http://localhost:3000/users`).subscribe(
      (users: any) => {
        this.emitUsersSubject(users);
      },
      (error) => {
        this.emitError(error);
      }
    );
  }
  // Fonction pour se connecter
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
    this.router.navigate(['person']);
  }
}
