import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

export interface Menu {
  menu_id: number;
  menu_id_top: number;
  menu_name: string;
  menu_order: number;
  is_active: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
  ) { }

  getForPageAccess()
  {
    return this.http.get<Menu>(env.apiUrl + '/sys/menu/data_for_page_access');
  }

}
