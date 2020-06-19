import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

export class UserGroup {
  group_id: number;
  groud_name: string;
  is_active: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private http: HttpClient) { }

  save(data)
  {
    return this.http.post<UserGroup>(env.apiUrl + '/sys/group/save', data);
  }

  checkGroupNameDuplicat(group_name)
  {
    return this.http.post<UserGroup>(env.apiUrl + '/sys/group/check_group_name_duplicat', {
      group_name: group_name
    });
  }

}
