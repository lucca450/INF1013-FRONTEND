import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  serverUrl = 'http://localhost:8080/api/';
  constructor() { }
}
