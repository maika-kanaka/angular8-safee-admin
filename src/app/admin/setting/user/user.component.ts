import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { environment as env } from 'src/environments/environment';

import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/_helpers/auth.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { UserEditComponent } from '../user-edit/user-edit.component';

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

  @ViewChild(UserEditComponent, {static: false})
  private userEditComp: UserEditComponent;

  constructor(private authSrv: AuthService, private route: Router, private renderer: Renderer) { }

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
        {data: 'is_block'},
        {
          "render": function (data, type, full, meta) {
            var edt = "<button type='button' user-edit-id='"+ full.user_id +"' class='btn btn-sm btn-success'> <i user-edit-id='"+ full.user_id +"' class='fa fa-edit'></i> </button> ";
            var dlt = "<button type='button' user-delete-id='"+ full.user_id +"' class='btn btn-sm btn-danger'> <i user-delete-id='"+ full.user_id +"' class='fa fa-close'></i> </button> ";
            return edt + " &nbsp; " + dlt;
          }
        }
      ]
    };
  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("user-edit-id")) 
      {
        this.userEditComp.fillForm( event.target.getAttribute("user-edit-id") );
      }
    });
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
