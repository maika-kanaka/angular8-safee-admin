import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

export interface Group {
  group_id: number;
  group_name: string;
  is_active: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getAll(wheres)
  {
    return this.http.get<Group>(env.apiUrl + '/sys/group/data', {
      params: wheres
    });
  }

}
