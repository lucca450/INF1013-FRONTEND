import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PersonService} from '../../../services/person/person.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {DeletePersonComponent} from '../delete-person/delete-person.component';
import {MatSelect} from '@angular/material/select';
import {User} from '../../../models/users/user';
import {ReactivePersonComponent} from '../reactive-person/reactive-person.component';

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
  @ViewChild('typeAccount') typeAccount: MatSelect;

  dataSource = new MatTableDataSource();
  // Colonnes qui seront affichées
  displayedColumns: string[] = [ 'fname', 'lname', 'phone', 'actions-icon' ];
  searchInputValue: string;
  defaultSelectList = '';


  constructor(private personService: PersonService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Appel de la méthode qui fait la requête pour récupèrer les personnes actives.
    this.personService.getAllPersons();
    // On écoute la requête
    this.personSubscription = this.personService.personsSubject.subscribe(
      (persons: any) => {
        this.resetMatTable(persons);
      }
    );
    // Vérification pour savoir si une requête à eu une erreur.
    this.errorsSubscription = this.personService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );

    // Nous permet de définir sur quels attributs la recherche va se faire.
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => data.fname.toLowerCase().includes(filter) ||
      data.lname.toLowerCase().includes(filter) ||
      data.phone.toString().includes(filter);

    this.personService.activateDesactivateSubject.subscribe(
      (persons: any) => {
        this.personService.getAllPersons();
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  OnKeyUpSearchInput(event: Event): void{
    this.searchInputValue = (event.target as HTMLInputElement).value;
  }

// Fonction qui permet d'appliquer le filtre sur toute les colonnes du tableau selon ce que l'utilisateur à écris.
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.sort.active = this.sort.active;
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

  // Fonction pour réagir lorsque l'utilisateur clique sur la corbeille(Supprimer)
  onDelete(id: number): void{
    const dialogRef = this.dialog.open(DeletePersonComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        this.personService.ActiveDesactivePerson(id, false);
      }
    });
  }

  OnReactivatePerson(id): void{
    const dialogRef = this.dialog.open(ReactivePersonComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        // Réactivation de la personne
        this.personService.ActiveDesactivePerson(id, true);
      }
    });
  }
  resetMatTable(persons): void{
    this.dataSource = new MatTableDataSource(persons);
    this.dataSource.filterPredicate = this.getFilterPredicate();
    this.dataSource.sort = this.sort;
    this.applyFilter();
  }


  ngOnDestroy(): void{
  this.personSubscription.unsubscribe();
  this.errorsSubscription.unsubscribe();
}

}
