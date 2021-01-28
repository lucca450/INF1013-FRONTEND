import { Injectable } from '@angular/core';
import {Doctor} from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  doctors: Doctor[];

  constructor() { this.doctors = this.mockDoctorData(); }

  private mockDoctorData(): Doctor[]{
    return [
      {lname: 'moumou', fname: 'dau', email: 'test1@gmail.ca', fax: 1111111111, phone: 1111111111},
      {lname: 'doudou', fname: 'aby', email: 'test2@gmail.ca', fax: 2222222222, phone: 2222222222},
      {lname: 'prot', fname: 'col', email: 'test3@gmail.ca', fax: 3333333333, phone: 3333333333}
    ];
  }
}
