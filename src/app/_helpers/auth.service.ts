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
            localStorage.setItem('user', JSON.stringify(result['data'].user));
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
    var myPageAccess = [];
    if(localStorage.getItem("pageAccess") !== null){
      myPageAccess = JSON.parse(localStorage.getItem("pageAccess"));
    }

    // minimum access
    myPageAccess.push("my_profile");

    if (myPageAccess.indexOf(menu_id) === -1) {
      return false;
    }else{
      return true;
    }
  }

  currentUser()
  {
    var user;

    if( localStorage.getItem("user") !== null ){
      user = JSON.parse(localStorage.getItem("user"));
    }else{
      user = {
        user_id: '',
        user_name: '',
        user_fullname: '',
        user_email: ''
      };
    }

    return user;
  }
}
