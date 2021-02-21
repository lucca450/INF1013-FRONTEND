import { Injectable } from '@angular/core';
import {WorkCity} from '../../models/workCity/work-city';

@Injectable({
  providedIn: 'root'
})
export class WorkCityService {

  workCity: WorkCity[];
  constructor() {
    this.workCity = this.mockWorkCityData();
  }
  // Fonction pour générer les données lié aux villes
  private mockWorkCityData(): WorkCity[]{
    return[
      {interfaceName: 'WorkCity', id : 0, name : 'Trois-Rivières'},
      {interfaceName: 'WorkCity', id : 1, name : 'Shawinigan'},
      {interfaceName: 'WorkCity', id : 2, name : 'Louiseville'},
      {interfaceName: 'WorkCity', id : 3, name : 'St-Tite'}
    ];
  }
  // Fonction pour récupérer le la ville à partir de son identifiant
  public getCityFromID(id: number): WorkCity {
    let workCity: WorkCity;
    workCity = this.workCity.find(function(w: WorkCity) {
      return w.id === id;
    });
    return workCity;
  }
}
