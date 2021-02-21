import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PersonService} from '../../../services/person/person.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';




@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit, AfterViewInit  {

  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource(this.personService.persons);

  // Colonnes qui seront affichées
  displayedColumns: string[] = [ 'fname', 'lname', 'phone', 'actions-icon' ];


  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    // Nous permet de définir sur quels attributs la recherche va se faire.
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.fname.toLowerCase().includes(filter) ||
        data.lname.toLowerCase().includes(filter) ||
        data.phone.toString().includes(filter) ; /* ||
        data.email.toLowerCase().includes(filter);*/
    };


  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  // Fonction qui permet d'appliquer le filtre sur toute les colonnes du tableau selon ce que l'utilisateur à écris.
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
