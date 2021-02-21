import { Injectable } from '@angular/core';
import {Reference} from '../../models/reference/reference';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  reference: Reference[];

  constructor() {
    this.reference = this.mockReferenceData();
  }

  private mockReferenceData(): Reference[]{
    return[
      {interfaceName: 'Reference', id : 0, name : 'Aucune'},
      {interfaceName: 'Reference', id : 1, name : 'CIUSSS'},
      {interfaceName: 'Reference', id : 2, name : 'SIV'},
      {interfaceName: 'Reference', id : 3, name : 'SI'},
      {interfaceName: 'Reference', id : 4, name : 'Organismes communautaires'},
      {interfaceName: 'Reference', id : 5, name : 'Centre local d’emploi'},
      {interfaceName: 'Reference', id : 6, name : 'SEMO'},
      {interfaceName: 'Reference', id : 7, name : 'Personne elle-même'},
      {interfaceName: 'Reference', id : 8, name : 'Ami'},
      {interfaceName: 'Reference', id : 9, name : 'Famille'},
      {interfaceName: 'Reference', id : 9, name : 'Autres'}
    ];
  }

  public getReferenceFromID(id: number): Reference {
    let reference: Reference;
    reference = this.reference.find(function(r: Reference) {
      return r.id === id;
    });
    return reference;
  }
}
