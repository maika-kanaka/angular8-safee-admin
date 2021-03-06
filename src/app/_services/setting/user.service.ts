import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

export interface User {
  user_fullname: string;
  user_name: string;
  user_email: string;
  is_active: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(wheres)
  {
    return this.http.get<User>(env.apiUrl + '/sys/user/data', {
      params: wheres
    });
  }

  checkEmailDuplicat(user_email, page = 'add', user_id = null)
  {
    return this.http.post<User>(env.apiUrl + '/sys/user/check_email_duplicat', {
      user_email: user_email,
      page: page,
      user_id: user_id
    });
  }

  checkUsernameDuplicat(user_name, page = 'add', user_id = null)
  {
    return this.http.post<User>(env.apiUrl + '/sys/user/check_username_duplicat', {
      user_name: user_name,
      page: page,
      user_id: user_id
    });
  }

  profileUpdate(data)
  {
    return this.http.post<User>(env.apiUrl + '/sys/user/profile_update', data);
  }

  save(user)
  {
    return this.http.post(env.apiUrl + '/sys/user/save', user);
  }

  update(user)
  {
    return this.http.post(env.apiUrl + '/sys/user/update', user);
  }



  getUrlDelete()
  {
    return env.apiUrl + '/sys/user/delete';
  }

}
