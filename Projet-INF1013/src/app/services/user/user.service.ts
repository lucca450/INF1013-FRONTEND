import { Injectable } from '@angular/core';
import {User} from '../../models/users/user';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Intervenant} from '../../models/intervenant/intervenant';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  UserFromIdSubject = new Subject<User>();
  userSubject = new Subject<User>(); // L'utilisateur connecté
  user: User;
  isAuth: boolean = false;
  usersSubject = new Subject<any>(); // Les utilisateurs
  verifySubjectError = new Subject<String>(); // S'il y a une erreur, elle est envoyé à ceux qui se souscris
  authSubject: Subject<boolean> = new Subject<boolean>(); // Détermine si l'utilisateur est connecté ou déconnecté.


  constructor(private httpClient: HttpClient, private router: Router) {

  }

  getUsers(){
    this.httpClient.get<User>(`http://localhost:3000/users`).subscribe(
      (users: any) => {
        this.emitUsersSubject(users);
      },
      (error) => {
        this.emitError(error);
      }
    )
  }

  addUserToServer(user: User) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(user);
    this.httpClient.post('http://localhost:3000/users', body, {'headers': headers}).subscribe(
      (intervenant: any) => {
        this.emitUsersSubject(user);
        this.emitNoError();
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de l\'ajout de l\'utilisateur. Veuillez réessayer plus tard';
        this.emitError(message);
      }
    )
  }

  editUserToServer(user: User) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(user);
    return this.httpClient.put('http://localhost:3000/users/'+user.id, body, {'headers': headers}).subscribe(
      (intervenant: any) => {
        this.emitUsersSubject(user);
        this.emitNoError();
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de l\'ajout de l\'utilisateur. Veuillez réessayer plus tard';
        this.emitError(message);
      }
    )
  }

  // Fonction pour se connecter
  verifyUserExist(username: String, password: String){
    this.httpClient.get<User>(`http://localhost:3000/users?active=true&username=`+username+'&password='+password).subscribe(
      (user: any) => {
        if(user.length>0){
          this.signIn(user[0]);
        }
        else{
          this.emitError("Le nom d'utilisateur ou le mot de passe est invalide.");
        }

      },
      (error) => {
        this.emitError("Erreur de communication avec le serveur ! veuillez réessayer plus tard.");
      }
    )
  }

  getUserFromId(id: number){
    this.httpClient.get<User>(`http://localhost:3000/users/`+id).subscribe(
      (user: any) => {
        this.emitUserFromIdSubject(user)
      },
      (error) => {
        console.log('erreur');
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des intervenants';
        this.emitError(message);
      }
    )
  }

  // Fonction pour gèrer lorsqu'on émet les données pour que les autres qui écoute le sujet soit au courant de quel utilisateur qui est connecté.
   emitUsersSubject(user: User) {
    this.usersSubject.next(user);
  }

  emitUserFromIdSubject(user: User) {
    this.UserFromIdSubject.next(user);
  }

  private emitUserSubject(user: User) {
    this.userSubject.next(user);
  }
  private emitNoError(){
    this.verifySubjectError.next();
  }

  private emitError(error: String){
    this.verifySubjectError.next(error);
  }

  // Fonction pour gèrer lorsqu'on émet les données pour que les autres qui écoute le sujet soit au courant lorsque l'utilisateur est connecté ou déconnecté.
  emitAuthSubject(isauth: boolean) {
    this.authSubject.next(isauth);
  }

  // Fonction pour gèrer la déconnecter
  signOut() {
    this.emitAuthSubject(false);
  }

  private signIn(user: any){
    this.user = user;
    this.isAuth = true;
    this.emitAuthSubject(this.isAuth);
    this.emitUserSubject(this.user);
    this.router.navigate(['person']);
  }
}
