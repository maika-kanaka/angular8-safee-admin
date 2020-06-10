import { Component, OnInit } from '@angular/core';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      ajax: {
        url: env.apiUrl + '/sys/group/data',
        dataSrc: 'data.groups',
        data: {
          jwtAuth: localStorage.getItem("access_token")
        }
      },
      order: [[0, "asc"]],
      columns: [
        {data: 'group_name'},
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
