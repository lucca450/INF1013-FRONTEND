import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {config, Observable} from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     const token = localStorage.getItem('token');

     const modifyRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
       Authorization: 'Bearer ' + token
      }
    });

     console.log('Token : ');
     console.log(token);
     return next.handle(modifyRequest);

  }
}
