import { Injectable } from '@angular/core';
import {Sector} from '../../models/sector/sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  sector: Sector[];
  constructor() {
    this.sector = this.mockSectorData();
  }

  private mockSectorData(): Sector[]{
    return[
      {interfaceName: 'Sector', id : 0, name : 'sous-traitance'},
      {interfaceName: 'Sector', id : 1, name : 'récupération-recyclage'},
      {interfaceName: 'Sector', id : 2, name : 'vente de produits artistiques'}
    ];
  }

  public getSectorFromID(id: number): Sector {
    let sector: Sector;
    sector = this.sector.find(function(s: Sector) {
      return s.id === id;
    });
    return sector;
  }


}
