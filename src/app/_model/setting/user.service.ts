import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

export interface User {
  user_name: string;
  user_email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll()
  {
    return this.http.get<User>(env.apiUrl + '/sys/user/data');
  }
}
