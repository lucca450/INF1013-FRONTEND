import {Subject} from 'rxjs';

export class AuthService {

  isAuth : boolean = false;
  authSubject: Subject<boolean> = new Subject<boolean>();
  // Fonction pour simuler la connection
  signIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            this.emitAuthSubject();
            resolve(true);
          }, 200
        );
      }
    );
  }
  // Fonction pour gèrer la déconnecter
  signOut() {
    this.isAuth = false;
    this.emitAuthSubject();
  }
  // Fonction pour gèrer lorsqu'on émet les données pour que les autres qui écoute le sujet soit au courant lorsque l'utilisateur est connecté ou déconnecté.
  emitAuthSubject() {
    this.authSubject.next(this.isAuth);
  }
}
