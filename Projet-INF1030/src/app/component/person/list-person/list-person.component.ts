import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PersonService} from '../../../services/person/person.service';
import {Doctor} from '../../../models/doctor/doctor';
import {Person} from '../../../models/person/person';
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

  // Columns qui seront affichées
  displayedColumns: string[] = ['actions-icon', 'fname', 'lname', 'phone'];


  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    // Nous permet de définir sur quels attributs la recherche va se faire.
    // tslint:disable-next-line:only-arrow-functions
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
