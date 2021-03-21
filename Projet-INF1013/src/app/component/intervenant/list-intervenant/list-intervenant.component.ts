import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DeleteIntervenantComponent} from '../delete-intervenant/delete-intervenant.component';


@Component({
  selector: 'app-list-intervenant',
  templateUrl: './list-intervenant.component.html',
  styleUrls: ['./list-intervenant.component.css']
})
export class ListIntervenantComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  errorMessage: any;
  intervenants = new MatTableDataSource(this.intervenantService.intervenants);
  intervenantSubscription: Subscription;
  displayedColumns: string[] = [ 'fname', 'lname', 'email', 'phone', 'address', 'actions-icon']; // L'ordre des colonnes est déterminé ici



  constructor(private intervenantService: IntervenantService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.intervenantSubscription = this.intervenantService.intervenantSubject.subscribe(
      (intervenants: any) => {
        this.intervenants = intervenants;
      }
    )
    // Nous permet de définir sur quels attributs la recherche va se faire.
    // tslint:disable-next-line:only-arrow-functions

    this.intervenants.filterPredicate = function(data, filter: string): boolean {
      return data.fname.toLowerCase().includes(filter) ||
        data.lname.toLowerCase().includes(filter) ||
        data.phone.includes(filter) ||
        data.email.toLocaleLowerCase().includes(filter) ||
        data.address.toLocaleLowerCase().includes(filter)
    };

    /* AVANT AVEC FIREBASE
    this.intervenantService.intervenantFromDb$.subscribe(
      (value:any) => {
        this.intervenants = new MatTableDataSource(value);
      }
    );
 */
    /*
    // Récupérer les intervenants
    this.intervenantSubscription = this.intervenantService.intervenantSubject.subscribe(
      (intervenants: any) => {
        this.intervenants = intervenants;
      }
    )

    */

  }

  ngAfterViewInit(): void {
    this.intervenants.sort = this.sort;
  }
  // Fonction qui permet d'appliquer le filtre sur toute les colonnes du tableau selon ce que l'utilisateur à écris.
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.intervenants.filter = filterValue.trim().toLowerCase();
  }
  onDelete(id: number){
    const dialogRef = this.dialog.open(DeleteIntervenantComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.intervenantService.deleteIntervenantToServer(id).then(
        (response) => {

        },
        (error) => {
          this.errorMessage = error;
        });
      }
    });
  }

  ngOnDestroy() {
    this.intervenantSubscription.unsubscribe();
  }
}
