import { Component, OnInit, ViewChild } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {

  static menu_id: string = 'system_user_group';
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, {static: false})
  private datatableElement: DataTableDirective;

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

  refreshTableGroup(datatableElement: DataTableDirective)
  {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }



  modalAddGroupUser()
  {
    $('#modal-user-group-add').modal('show');
  }

  eventUserGroupAdd($event)
  {
    if(typeof $event == 'string' && $event == 'refresh_data'){
      this.refreshTableGroup(this.datatableElement);
    }
  }

}
