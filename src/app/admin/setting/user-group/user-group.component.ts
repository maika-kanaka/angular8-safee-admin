import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { DataTableDirective } from 'angular-datatables';

import { ModalConfirmComponent } from 'src/app/_ui/modal-confirm/modal-confirm.component';
import { UserGroupService } from 'src/app/_services/setting/user-group.service';

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

  @ViewChild(ModalConfirmComponent, {static: false})
  private modalConfirmComp: ModalConfirmComponent;

  constructor(private renderer: Renderer, private userGroupSrv: UserGroupService) { }

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
              var edt = "<button type='button' user-edit-id='"+ full.group_id +"' class='btn btn-sm btn-success'> <i user-edit-id='"+ full.group_id +"' class='fa fa-edit'></i> </button> ";
              var dlt = "<button type='button' user-delete-id='"+ full.group_id +"' class='btn btn-sm btn-danger'> <i user-delete-id='"+ full.group_id +"' class='fa fa-close'></i> </button> ";
              return edt + " " + dlt;
            }
        }
      ]
    };
  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if ( event.target.hasAttribute("user-edit-id") ) 
      {
        
      }
      else if( event.target.hasAttribute("user-delete-id") )
      {
        this.modalConfirmComp.showModal({
          id_trx: event.target.getAttribute("user-delete-id"),
          url: this.userGroupSrv.getUrlDelete()
        });
      }
    });
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
