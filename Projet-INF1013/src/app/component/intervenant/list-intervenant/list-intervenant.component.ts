import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DeleteIntervenantComponent} from '../delete-intervenant/delete-intervenant.component';
import {UserService} from '../../../services/user/user.service';


@Component({
  selector: 'app-list-intervenant',
  templateUrl: './list-intervenant.component.html',
  styleUrls: ['./list-intervenant.component.css']
})
export class ListIntervenantComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  errorMessage: string;
  intervenants = new MatTableDataSource();
  accountid: number = this.userService.user.id;
  displayedColumns: string[] = [ 'fname', 'lname', 'email', 'phone', 'address', 'actions-icon']; // L'ordre des colonnes est déterminé ici

  // Subscription
  intervenantSubscription: Subscription;
  errorsSubscription: Subscription;



  constructor(private intervenantService: IntervenantService, private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
  // appel de la méthode pour obtenir tous les intervenants actifs
  this.intervenantService.getActiveIntervenants();
  // On écoute la requête qui nous retourne les intervenants actifs pour les récupérer.
  this.intervenantSubscription = this.intervenantService.intervenantsSubject.subscribe(
      (intervenants: any) => {
        this.intervenants = new MatTableDataSource(intervenants);
      },
    );
  // Si une erreur est reçu par la requête, on l'affiche.
  this.errorsSubscription = this.intervenantService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      },
    );

  // Nous permet de définir sur quels attributs la recherche va se faire.
  this.intervenants.filterPredicate = (data: any, filter: string): boolean => data.fname.toLowerCase().includes(filter) ||
    data.lname.toLowerCase().includes(filter) ||
    data.phone.includes(filter) ||
    data.email.toLocaleLowerCase().includes(filter) ||
    data.address.toLocaleLowerCase().includes(filter);
  }

  ngAfterViewInit(): void {
    this.intervenants.sort = this.sort;
  }
  // Fonction qui permet d'appliquer le filtre sur toute les colonnes du tableau selon ce que l'utilisateur à écris.
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.intervenants.filter = filterValue.trim().toLowerCase();
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
            this.intervenantService.getActiveIntervenants();
          },
          (error) => {
            this.errorMessage = error;
        }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.intervenantSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }
}
