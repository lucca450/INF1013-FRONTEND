import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/users/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  isAuth: boolean;
  isAuthSubscription: Subscription;

  user: User;
  userSubscription: Subscription;


  accountID: number = 0;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadingObersable();

  }

  // Fonction pour déconnecter l'utilisateur.
  OnSignOut() {
    this.userService.signOut();
    //this.isAuth = this.authService.isAuth;
    this.router.navigate(['/login'])
  }

  private loadingObersable(){
    this.isAuthSubscription = this.userService.authSubject.subscribe((value: boolean) => {
        this.isAuth = value;
      },
      (value: boolean) => {
        console.log('erreur');
      });

    this.userSubscription = this.userService.userSubject.subscribe((value: User) => {
        this.user = value;
        console.log(this.user);
      },
      (value: boolean) => {
        console.log('erreur');
      });
  }

}
