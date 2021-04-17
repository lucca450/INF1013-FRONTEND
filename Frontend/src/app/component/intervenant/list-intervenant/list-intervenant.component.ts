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
        this.resetMatTable(intervenants);
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

  // S'il y a une demande pour activer ou désactiver un utilisateur
  this.intervenantService.activateDesactivateSubject.subscribe(
      (intervenants: any) => {
        this.intervenantService.getAllIntervenants();
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }


  ngAfterViewInit(): void {
    this.intervenants.sort = this.sort;
  }

  OnKeyUpSearchInput(event: Event): void{
    this.searchInputValue = (event.target as HTMLInputElement).value;
  }

  // Fonction qui est exécuté sur chaque utilisateur lorsque this.intervenant.filter est appelé.
  // tslint:disable-next-line:typedef
  getFilterPredicate() {
    return (user: User, filters: string) => {
      // On split l'array pour récupérer la valeur de la select list et du input dans la recherche.
      const filterArray = filters.split('$');
      const filterInput = filterArray[0];
      const filterSelectList = filterArray[1];
      const customVerifyActive = filterArray[2];

      const matchFilter = [];

      // On filtre selon la recherche
      let customFilterInput = user.lname.toLowerCase().includes(filterInput) ||
          user.fname.toLowerCase().includes(filterInput) ||
          user.phone.includes(filterInput) ||
          user.email.toLocaleLowerCase().includes(filterInput) ||
          user.address.toLocaleLowerCase().includes(filterInput);


      // Si le filtre de la recherche est vrai
      if (customFilterInput === true) {
        // Si c'est vrai, c'est que c'est innactif ou actif donc il faut vérifier le statut de l'utilisateur.
        // Sinon, on vérifie pas et on le push.
        if (customVerifyActive === 'true'){
          if (String(user.active) === filterSelectList) {
            customFilterInput = true;
          }
          else{
            customFilterInput = false;
          }
        }
      }
      // On push l'utilisateur dans la liste
      matchFilter.push(customFilterInput);

      return matchFilter.every(Boolean);
    };
  }
  // Fonction qui récupère les valeurs des filtres et qui les passes au filterPredicate.
applyFilter(): void{

    let filterInput = this.searchInputValue;
    let filterSelectList = this.typeAccount.value;
    let verifyActiveboolean = false;

    // Si c'est null ou undefined, alors ca veut dire que l'utilisateur à rien entré dans l'input.
    if (filterInput === null || filterInput === undefined){
      filterInput = '';
    }

    // Si dans la SelectList c'est diffrent de "tous", alors il faut faire une vérification supplémentaire sur le champ "actif".
    // Sinon, on fera aucune vérification
    if (filterSelectList !== ''){
      verifyActiveboolean = true;
    }
    else{
      filterSelectList = true;
    }

    // Concaténation de nos différentes valeurs pour pouvoir les récupèrer dans filterPredicate avec un split.
    const filterValue = filterInput + '$' + filterSelectList + '$' + verifyActiveboolean;
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
      }
    });
  }

  // Fonction qui permet de réagir lorsque l'utilisateur clique sur le crochet vert (Boutton réactiver)
  OnReactivateAccount(id): void{
    const dialogRef = this.dialog.open(ReactiveIntervenantComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        // Réactivation de l'intervenant
        this.intervenantService.ActiveDesactiveIntervenant(id, true);
      }
    });
  }
  // Fonction qui permet de réagir lorsque l'utilisateur clique sur l'icone pour rénitialiser son mot de passe
  OnResetPassword(id): void{
    const dialogRef = this.dialog.open(ResetPasswordComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        // Rénitialisation du mot de passe de l'intevenant
        this.intervenantService.getIntervenantFromId(id);
      }
    });
  }

  // Fonction pour rénitialiser les données de la table.
  resetMatTable(intervenants): void{
    this.intervenants = new MatTableDataSource(intervenants);
    this.intervenants.filterPredicate = this.getFilterPredicate();
    this.intervenants.sort = this.sort;
    this.applyFilter();
  }

  ngOnDestroy(): void {
    this.intervenantSubscription.unsubscribe();
    this.intervenantsSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

}
