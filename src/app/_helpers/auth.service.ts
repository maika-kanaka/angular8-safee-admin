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
    return this.http.post<any>(env.apiUrl + '/login', formValue)
          .pipe(map(result => {
            localStorage.setItem('access_token', result['data'].jwt);
            localStorage.setItem('pageAccess', JSON.stringify(result['data'].pageAccess));
            return true;
          }));
  }

  logout() 
  {
    localStorage.removeItem('access_token');
    localStorage.removeItem('pageAccess');
  }

  hasAccess(menu_id: string): boolean
  {
    var myPageAccess = JSON.parse(localStorage.getItem("pageAccess"));

    if (myPageAccess.indexOf(menu_id) === -1) {
      return false;
    }else{
      return true;
    }
  }
}
