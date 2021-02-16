import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';

@Component({
  selector: 'app-list-intervenant',
  templateUrl: './list-intervenant.component.html',
  styleUrls: ['./list-intervenant.component.css']
})
export class ListIntervenantComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  intervenants = new MatTableDataSource(this.intervenantService.intervenants);
  displayedColumns: string[] = ['actions-icon', 'fname', 'lname', 'email', 'phone', 'address']; // L'odre des colonnes est déterminé ici


  constructor(private intervenantService: IntervenantService) { }

  ngOnInit(): void {
    // Nous permet de définir sur quels attributs la recherche va se faire.

    this.intervenants.filterPredicate = function(data, filter: string): boolean {
      return data.fname.toLowerCase().includes(filter) ||
        data.lname.toLowerCase().includes(filter) ||
        data.phone.includes(filter) ||
        data.email.toLocaleLowerCase().includes(filter) ||
        data.address.toLocaleLowerCase().includes(filter)
    };
  }

  ngAfterViewInit(): void {
    this.intervenants.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.intervenants.filter = filterValue.trim().toLowerCase();
  }

}
