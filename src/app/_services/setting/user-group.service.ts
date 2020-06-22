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

  getAll(wheres)
  {
    return this.http.get<UserGroup>(env.apiUrl + '/sys/group/data', {
      params: wheres
    });
  }

  save(data, page_access)
  {
    data['page_access'] = page_access;
    return this.http.post<UserGroup>(env.apiUrl + '/sys/group/save', data);
  }

  update(data, page_access)
  {
    data['page_access'] = page_access;
    return this.http.post<UserGroup>(env.apiUrl + '/sys/group/update', data);
  }

  checkGroupNameDuplicat(group_name, page = 'add', gid = null)
  {
    return this.http.post<UserGroup>(env.apiUrl + '/sys/group/check_group_name_duplicat', {
      group_name: group_name,
      page: page,
      group_id: gid
    });
  }



  getUrlDelete()
  {
    return env.apiUrl + '/sys/group/delete';
  }

}
