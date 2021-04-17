import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {config, Observable} from 'rxjs';
import {LocalStorageService} from '../services/storage/LocalStorageService ';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) { }

  // Intercepteur de chacune des requêtes pour le faire passer au JWT.
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     const token = this.localStorageService.get('token');
     const modifyRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
       Authorization: 'Bearer ' + token
      }
    });

     return next.handle(modifyRequest);

  }
}
