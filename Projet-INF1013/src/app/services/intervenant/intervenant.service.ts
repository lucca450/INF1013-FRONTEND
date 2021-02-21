import { Injectable } from '@angular/core';
import {Intervenant} from '../../models/intervenant/intervenant';
import {Router} from '@angular/router';
import {Person} from '../../models/person/person';
import {tryCatch} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class IntervenantService {

  intervenants: Intervenant[];
  constructor(private router: Router) {
    this.intervenants = this.mockIntervenantData();
  }
  // Fonction pour générer les données lié aux intervenants
  private mockIntervenantData(): Intervenant[]{
    return[
      {interfaceName: 'Intervenant', id : 0, lname : 'nomIntervenant', fname : 'prénomIntervenant', email : 'pierro_kool@hotmail.com', phone : '8196932091', address : '320 rue Amazone'},
      {interfaceName: 'Intervenant', id : 1, lname : 'nomIntervenant2', fname : 'prénomIntervenant2', email : 'pierro_kool@hotmail.com2', phone : '8196932092', address : '321 rue Amazone'},
      {interfaceName: 'Intervenant', id : 2, lname : 'nomIntervenant3', fname : 'prénomIntervenant3', email : 'pierro_kool@hotmail.com3', phone : '8196932093', address : '322 rue Amazone'}
    ];
  }

  // Fonction pour ajouter un intervenant
  addIntervenant(intervenant: any): void {
    if (this.intervenants.push(intervenant)){
      this.router.navigate(['intervenant']);
    }else{
      alert('Erreur lors de l\'ajout.');
    }
  }
  // Fonction pour récupérer l'intervenant à partir de son identifiant
  getIntervenantFromID(id: number): Intervenant{
   return this.intervenants.filter(p => p.id === id)[0];
}
  // Fonction pour modifier un intervenant
  editIntervenant(): void {
    this.router.navigate(['intervenant']);
  }

  // Fonction pour récupérer le nom complet de l'intervenant à partir de son identifiant
  public intervenantFullName(id: number): string {
    let intervenant: Intervenant;
    // tslint:disable-next-line:only-arrow-functions typedef
    intervenant = this.intervenants.find(function(i: Intervenant) {
      return i.id === id;
    });
    return intervenant.fname  + ' ' + intervenant.lname;
  }
  // Fonction annuler l'étape concernant l'intervenant
  cancelIntervenant(): void {
    this.router.navigate(['intervenant']);
  }
  // Fonction pour modifier le compte de l'intervenant
  editAccount(myID: number, data: any): void {

    try {
      const itemIndex = this.intervenants.findIndex(item => item.id === myID);
      data.id = this.intervenants[itemIndex].id;
      this.intervenants[itemIndex] = data;
      this.router.navigate(['intervenant']);
    }catch (e) {
      alert('Erreur lors de la modification.');
    }



  }
}
