import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  isAuth: boolean;
  isAuthSubscription: Subscription;
  user: User;
  userSubscription: Subscription;
  accountID = 0;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.loadingObersable();
  }
  // Fonction pour déconnecter l'utilisateur.
  OnSignOut(): void {
    this.userService.signOut();
    this.router.navigate(['/login']);
  }

  // Chargement des observables
  private loadingObersable(): void {
    this.isAuthSubscription = this.userService.authSubject.subscribe((value: boolean) => {
        this.isAuth = value;
      });

    this.userSubscription = this.userService.userSubject.subscribe((value: User) => {
        this.user = value;
      });
  }

  ngOnDestroy(): void {
    this.isAuthSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
