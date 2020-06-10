import { Injectable, ɵConsole } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor 
{
  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    request = request.clone({
        params: request.params.set("jwtAuth", localStorage.getItem("access_token"))
    });

    return next.handle(request);
  }
}