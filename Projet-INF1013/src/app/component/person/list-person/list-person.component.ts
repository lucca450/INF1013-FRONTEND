import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PersonService} from '../../../services/person/person.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DeleteIntervenantComponent} from '../../intervenant/delete-intervenant/delete-intervenant.component';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {DeletePersonComponent} from '../delete-person/delete-person.component';




@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit, AfterViewInit, OnDestroy{

  errorMessage: string;
  personSubscription: Subscription;
  errorsSubscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource();
  // Colonnes qui seront affichées
  displayedColumns: string[] = [ 'fname', 'lname', 'phone', 'actions-icon' ];


  constructor(private personService: PersonService, private dialog: MatDialog) {}

  ngOnInit(): void {

    this.personService.getActivePersons();

    this.personSubscription = this.personService.personsSubject.subscribe(
      (persons: any) => {
        this.dataSource = new MatTableDataSource(persons);
      }
    );

    this.errorsSubscription = this.personService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );

    // Nous permet de définir sur quels attributs la recherche va se faire.
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => data.fname.toLowerCase().includes(filter) ||
      data.lname.toLowerCase().includes(filter) ||
      data.phone.toString().includes(filter);
/*
    // Nous permet de définir sur quels attributs la recherche va se faire.
    this.dataSource.filterPredicate = function(data:any, filter: string): boolean {
      return data.fname.toLowerCase().includes(filter) ||
        data.lname.toLowerCase().includes(filter) ||
        data.phone.toString().includes(filter) ;
    };
     */

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  // Fonction qui permet d'appliquer le filtre sur toute les colonnes du tableau selon ce que l'utilisateur à écris.
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number): void{
    const dialogRef = this.dialog.open(DeletePersonComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        this.personService.ActiveDesactivePerson(id, false);
        this.personService.activateDesactivateSubject.subscribe(
          (persons: any) => {
            this.personService.getActivePersons();
          },
          (error) => {
            this.errorMessage = error;
          }
        );
      }
    });
  }
ngOnDestroy(): void{
  this.personSubscription.unsubscribe();
  this.errorsSubscription.unsubscribe();
}

}
