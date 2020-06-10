import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(formValue: object)
  { 
    return this.http.post(env.apiUrl + '/login', formValue)
          .pipe(map(result => {
            localStorage.setItem('access_token', result['data'].jwt);
            return true;
          }));
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
