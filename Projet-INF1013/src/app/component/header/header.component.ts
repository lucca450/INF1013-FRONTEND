import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {AuthService} from '../../services/authentification/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  isAuth: boolean;
  isAuthSubscription: Subscription | undefined;
  accountID: number = 0;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    // @ts-ignore
    this.isAuthSubscription = this.authService.authSubject.subscribe((value: boolean) => {
      this.isAuth = value;
    },
      (value: boolean) => {
      console.log('erreur');
      });
  }

  // Fonction pour déconnecter l'utilisateur.
  OnSignOut() {
    this.authService.signOut();
    this.isAuth = this.authService.isAuth;
    this.router.navigate(['/login'])
  }
}
