import { Injectable } from '@angular/core';
import {User} from '../../models/users/user';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[]; // Liste de tout les utilisateurs
  user: User; // L'utilisateur connecté
  userSubject = new Subject<any>();
  verifyError = new Subject<any>();
  isAuth: boolean = false;
  authSubject: Subject<boolean> = new Subject<boolean>();


  constructor(private httpClient: HttpClient, private router: Router) {
    this.getUsers().subscribe(
      (users: any) => {
        this.users = users;
        this.emitUserSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )
  }

  getUsers(){
    return this.httpClient.get<User>(`http://localhost:3000/users`);
  }

  addUserToServer(user: User) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(user);
    this.httpClient.post('http://localhost:3000/users', body, {'headers': headers}).subscribe(
      (intervenant: any) => {
        this.addUser(user);
        this.emitNoError();
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de l\'ajout de l\'utilisateur. Veuillez réessayer plus tard';
        this.emitError(message);
      }
    )
  }

  addUser(user: any) {
  this.users.push(user);
  this.emitUserSubject();
  }

  editUserToServer(user: User) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(user);
    return this.httpClient.put('http://localhost:3000/users/'+user.id, body, {'headers': headers}).subscribe(
      (intervenant: any) => {
        this.editUser(user);
        this.emitNoError();
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de l\'ajout de l\'utilisateur. Veuillez réessayer plus tard';
        this.emitError(message);
      }
    )
  }

  editUser(user: any) {
    const index = this.getUserIndexFromId(user.id);
    this.users[index] = user;
    this.emitUserSubject();
  }

  // Fonction pour récupérer l'utilisateur à partir de son identifiant
  getUserFromID(id: number): User{
    const index = this.getUserIndexFromId(id);
    return this.users[index];
  }

  getUserIndexFromId(id: number): any {

    for (let i = 0 ; i < this.users.length; i++) {
      if (this.users[i].id == id) {
        return i;
      }
    }
  }

  // Fonction pour gèrer lorsqu'on émet les données pour que les autres qui écoute le sujet soit au courant de quel utilisateur qui est connecté.
  private emitUserSubject() {
    this.userSubject.next(this.user);
  }

  private emitNoError(){
    this.verifyError.next();
  }

  private emitError(error: String){
    this.verifyError.next({ error:  error});
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
      //  const randomSituation = Math.floor(Math.random() * 3) + 1;

      const  randomSituation = 1; // Pour éviter de se connecter à chaque fois (Évidament, faut remettre la ligne du haut avant la remise)

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
  getUserConnectedId() {
    return this.user.id;
  }
}
