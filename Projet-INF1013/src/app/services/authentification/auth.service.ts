import {Subject} from 'rxjs';

export class AuthService {

  isAuth : boolean = false;
  authSubject: Subject<boolean> = new Subject<boolean>();

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

  signOut() {
    this.isAuth = false;
    this.emitAuthSubject();
  }

  emitAuthSubject() {
    // @ts-ignore
    this.authSubject.next(this.isAuth);
  }
}
