import { Component, OnInit, ViewChild } from '@angular/core';
import { environment as env } from 'src/environments/environment';

import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/_helpers/auth.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit
{

  static menu_id: string = 'system_users';
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, {static: false})
  private datatableElement: DataTableDirective;

  constructor(private authSrv: AuthService, private route: Router) { }

  ngOnInit() {
    this.dtOptions = {
      ajax: {
        url: env.apiUrl + '/sys/user/data',
        dataSrc: 'data.users',
        data: {
          jwtAuth: localStorage.getItem("access_token")
        }
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

  modalUserAdd()
  {
    $("#modal-user-add").modal("show");
  }

  onSaveUser()
  {
    this.reloadUserTable(this.datatableElement);
  }

  reloadUserTable(datatableElement: DataTableDirective): void
  {
    this.datatableElement.dtInstance.then(
      (dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      }
    );
  }

}
