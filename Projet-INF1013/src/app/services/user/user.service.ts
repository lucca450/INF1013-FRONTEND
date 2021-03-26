import { Injectable } from '@angular/core';
import {User} from '../../models/users/user';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {rejects} from 'assert';
import {subscribeOn} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[]; // Liste de tout les utilisateurs
  user: User; // L'utilisateur connecté
  userSubject = new Subject<any>();
  isAuth: boolean = false;
  authSubject: Subject<boolean> = new Subject<boolean>();


  constructor(private httpClient: HttpClient, private router: Router) {
    this.getUsers().subscribe(
      (users: any) => {
        this.users = users;
        //this.emitUserSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )
  }

  getUsers(){
    return this.httpClient.get<User>(`http://localhost:3000/users`);
  }

  /*
  getUsers(){

    fetch('http://localhost:3000/Users')
      .then((response =>
          response.json()
      ))
      .then((json) =>
      {
        console.log('call');
        this.users = json;
      });
  }

   */
  // Fonction pour gèrer lorsqu'on émet les données pour que les autres qui écoute le sujet soit au courant de quel utilisateur qui est connecté.
  private emitUserSubject() {
    this.userSubject.next(this.user);
  }

  // Fonction pour gèrer lorsqu'on émet les données pour que les autres qui écoute le sujet soit au courant lorsque l'utilisateur est connecté ou déconnecté.
  emitAuthSubject() {
    this.authSubject.next(this.isAuth);
  }

  // Fonction pour gèrer la déconnecter
  signOut() {
    this.isAuth = false;
    this.emitAuthSubject();
  }

  // Fonction pour se connecter
  verifyUserExist(email: String, password: String){

    return new Promise(
      ((resolve, reject) => {
        console.log("Les users : "+this.users);
        const randomUser = Math.floor(Math.random() * this.users.length);
        const randomSituation = Math.floor(Math.random() * 3) + 1;

        if(randomSituation == 1)
        {
          resolve(this.users[0]); // Connexion en tant qu'administrateur, mais on pourrait le simuler aléatoirement anvec la variable "randomUser"
        }

        else if(randomSituation == 2)
        {
          reject("Le nom d'utilisateur ou le mot de passe est invalide.");
        }

        else if(randomSituation == 3)
        {
          reject("Erreur de communication avec le serveur ! veuillez réessayer plus tard.")
        }

      })
    )
  }

  signIn(user: any){
    this.isAuth = true;
    this.user = user;
    this.emitAuthSubject();
    this.emitUserSubject();
    this.router.navigate(['person']);
  }
}
