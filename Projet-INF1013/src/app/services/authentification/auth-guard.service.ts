import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../user/user.service';


// Pour injecter un service dans un autre service
@Injectable()
// C'est un service pour vérifier si l'utilisateur est connecté.
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }

}
