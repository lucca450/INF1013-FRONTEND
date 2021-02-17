import { Injectable } from '@angular/core';
import {Reference} from '../../models/reference/reference';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  reference: Reference[];
  constructor() { }
}
