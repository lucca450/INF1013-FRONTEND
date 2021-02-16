import { Injectable } from '@angular/core';
import {Intervenant} from '../../models/intervenant';
import {Router} from '@angular/router';
import {Person} from '../../models/person';

@Injectable({
  providedIn: 'root'
})
export class IntervenantService {

  intervenants: Intervenant[];
  constructor(private router: Router) {
    this.intervenants = this.mockIntervenantData();
  }

  private mockIntervenantData(): Intervenant[]{
    return[
      {interfaceName: 'Intervenant', id : 0, lname : 'nomIntervenant', fname : 'prénomIntervenant', email : 'pierro_kool@hotmail.com', phone : '8196932091', address : '320 rue Amazone'},
      {interfaceName: 'Intervenant', id : 1, lname : 'nomIntervenant2', fname : 'prénomIntervenant2', email : 'pierro_kool@hotmail.com2', phone : '8196932092', address : '321 rue Amazone'},
      {interfaceName: 'Intervenant', id : 2, lname : 'nomIntervenant3', fname : 'prénomIntervenant3', email : 'pierro_kool@hotmail.com3', phone : '8196932093', address : '322 rue Amazone'}
    ];
  }

  addIntervenant(): void {
    this.router.navigate(['intervenant']);
  }

  editIntervenant(): void {
    this.router.navigate(['intervenant']);
  }


  public intervenantFullName(id: number): string {
    let intervenant: Intervenant;
    // tslint:disable-next-line:only-arrow-functions typedef
    intervenant = this.intervenants.find(function(i: Intervenant) {
      return i.id === id;
    });
    return intervenant.fname  + ' ' + intervenant.lname;
  }

  cancelIntervenant() {
    this.router.navigate(['intervenant']);
  }

  editAccount() {
    this.router.navigate(['intervenant']);
  }
}
