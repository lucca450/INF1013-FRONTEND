import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DeleteIntervenantComponent} from '../delete-intervenant/delete-intervenant.component';
import {UserService} from '../../../services/user/user.service';
import {MatSelect} from '@angular/material/select';
import {User} from '../../../models/users/user';
import {ReactiveIntervenantComponent} from '../reactive-intervenant/reactive-intervenant.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';


@Component({
  selector: 'app-list-intervenant',
  templateUrl: './list-intervenant.component.html',
  styleUrls: ['./list-intervenant.component.css']
})
export class ListIntervenantComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('typeAccount') typeAccount: MatSelect;
  errorMessage: string;
  intervenants = new MatTableDataSource();
  accountid: number = this.userService.user.id;
  displayedColumns: string[] = [ 'fname', 'lname', 'email', 'phone', 'address', 'actions-icon']; // L'ordre des colonnes est déterminé ici
  searchInputValue: string;
  defaultSelectList = '';

  // Subscription
  intervenantsSubscription: Subscription;
  intervenantSubscription: Subscription;
  errorsSubscription: Subscription;



  constructor(private intervenantService: IntervenantService, private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
  // appel de la méthode pour obtenir tous les intervenants actifs
  this.intervenantService.getAllIntervenants();
  // On écoute la requête qui nous retourne les intervenants actifs pour les récupérer.
  this.intervenantsSubscription = this.intervenantService.intervenantsSubject.subscribe(
      (intervenants: any) => {
        this.intervenants = new MatTableDataSource(intervenants);
        this.intervenants.filterPredicate = this.getFilterPredicate();
        this.intervenants.sort = this.sort;
      },
    );
  // Si une erreur est reçu par la requête, on l'affiche.
  this.errorsSubscription = this.intervenantService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      },
    );
    // Si il y a une demande pour la rénitialisation du mot de passe
  this.intervenantSubscription = this.intervenantService.intervenantSubject.subscribe(
      (user: User) => {
        const randomPassword = Math.random().toString(36).slice(-16);
        user.password = randomPassword;
        this.intervenantService.ResetPasswordIntervenant(user);
      },
    );

  }


  ngAfterViewInit(): void {
    this.intervenants.sort = this.sort;
  }

  OnKeyUpSearchInput(event: Event): void{
    this.searchInputValue = (event.target as HTMLInputElement).value;
  }

  // tslint:disable-next-line:typedef
  getFilterPredicate() {
    return (user: User, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const filterInput = filterArray[0];
      const filterSelectList = filterArray[1];
      const customVerifyActive = filterArray[2];

      const matchFilter = [];
      // verify fetching data by our searching values

      let customFilterInput = user.lname.toLowerCase().includes(filterInput) ||
          user.fname.toLowerCase().includes(filterInput) ||
          user.phone.includes(filterInput) ||
          user.email.toLocaleLowerCase().includes(filterInput) ||
          user.address.toLocaleLowerCase().includes(filterInput);


      if (customFilterInput === true) {
        // push boolean values into array
        if (customVerifyActive === 'true'){
          if (String(user.active) === filterSelectList) {
            customFilterInput = true;
          }
          else{
            customFilterInput = false;
          }
        }
      }
      matchFilter.push(customFilterInput);

      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

applyFilter(): void{

    let filterInput = this.searchInputValue;
    let filterSelectList = this.typeAccount.value;
    let verifyActiveboolean = false;

    if (filterInput === null || filterInput === undefined){
      filterInput = '';
    }

    if (filterSelectList !== ''){
      verifyActiveboolean = true;
    }
    else{
      filterSelectList = true;
    }

    // create string of our searching values and split if by '$'
    const filterValue = filterInput + '$' + filterSelectList + '$' + verifyActiveboolean;
    console.log(filterValue);
    this.intervenants.filter = filterValue.trim().toLowerCase();
    this.intervenants.sort.active = this.sort.active;
  }

  // Fonction qui permet de réagir lorsque l'utilisateur clique sur la corbeille (Boutton supprimer)
onDelete(id: number): void{
    const dialogRef = this.dialog.open(DeleteIntervenantComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        // Désactivation de l'intervenant
        this.intervenantService.ActiveDesactiveIntervenant(id, false);
        this.intervenantService.activateDesactivateSubject.subscribe(
          (intervenants: any) => {
            this.intervenantService.getAllIntervenants();
          },
          (error) => {
            this.errorMessage = error;
        }
        );
      }
    });
  }

  OnReactivateAccount(id): void{
    const dialogRef = this.dialog.open(ReactiveIntervenantComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        // Réactivation de l'intervenant
        this.intervenantService.ActiveDesactiveIntervenant(id, true);
        this.intervenantService.activateDesactivateSubject.subscribe(
          (intervenants: any) => {
            this.intervenantService.getAllIntervenants();
          },
          (error) => {
            this.errorMessage = error;
          }
        );
      }
    });
  }

  OnResetPassword(id): void{
    const dialogRef = this.dialog.open(ResetPasswordComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        // Rénitialisation du mot de passe de l'intevenant
        this.intervenantService.getIntervenantFromId(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.intervenantSubscription.unsubscribe();
    this.intervenantsSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

}
