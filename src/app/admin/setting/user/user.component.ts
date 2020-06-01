import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit
{

  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      ajax: {
        url: env.apiUrl + '/sys/user/data',
        dataSrc: 'data.users'
      },
      order: [[0, "asc"], [1, "asc"]],
      columns: [
        {data: 'group_name'},
        {data: 'user_fullname'},
        {data: 'user_name'},
        {data: 'user_email'},
        {data: 'is_active'},
        {
            "render": function (data, type, full, meta) {
                return "";
            }
        }
      ]
    };
  }

}
