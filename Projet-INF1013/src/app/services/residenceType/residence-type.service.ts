import { Injectable } from '@angular/core';
import {ResidenceType} from '../../models/residenceType/residence-type';
import {City} from '../../models/city/city';

@Injectable({
  providedIn: 'root'
})
export class ResidenceTypeService {

  residenceType: ResidenceType[];
  constructor() {
    this.residenceType = this.mockResidenceTypeData();
  }

  private mockResidenceTypeData(): ResidenceType[]{
    return[
      {interfaceName: 'ResidenceType', id : 0, name : 'Appartement'},
      {interfaceName: 'ResidenceType', id : 1, name : 'Famille d\'accueil'},
      {interfaceName: 'ResidenceType', id : 2, name : 'Logement supervisé'},
      {interfaceName: 'ResidenceType', id : 3, name : 'Autres'}
    ];
  }

  public getResidenceTypeFromID(id: number): ResidenceType {
    let residenceType: ResidenceType;
    residenceType = this.residenceType.find(function(r: ResidenceType) {
      return r.id === id;
    });
    return residenceType;
  }
}
