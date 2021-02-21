import { Injectable } from '@angular/core';
import {EducationLevel} from '../../models/educationLevel/education-level';

@Injectable({
  providedIn: 'root'
})
export class EducationLevelService {

  educationLevel: EducationLevel[];
  constructor() {
    this.educationLevel = this.mockEducationLevelData();
  }

  private mockEducationLevelData(): EducationLevel[]{
    return[
      {interfaceName: 'EducationLevel', id : 0, name : 'Aucun diplôme'},
      {interfaceName: 'EducationLevel', id : 1, name : 'Études secondaires'},
      {interfaceName: 'EducationLevel', id : 2, name : 'Études professionnelles'},
      {interfaceName: 'EducationLevel', id : 3, name : 'Études collégiales'},
      {interfaceName: 'EducationLevel', id : 3, name : 'Études universitaires'}
    ];
  }

  public getEducationLevelFromID(id: number): EducationLevel {
    let educationLevel: EducationLevel;
    educationLevel = this.educationLevel.find(function(e: EducationLevel) {
      return e.id === id;
    });
    return educationLevel;
  }
}
