import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserGroupService } from 'src/app/_services/setting/user-group.service';
import { MenuService } from 'src/app/_services/setting/menu.service';

@Component({
  selector: 'app-user-group-edit',
  templateUrl: './user-group-edit.component.html',
  styleUrls: ['./user-group-edit.component.scss']
})
export class UserGroupEditComponent implements OnInit {

  // property ui
  modal_id: string = '#modal-user-group-edit';

  // property form
  my_page_access = [];
  menus: string[];
  groupUserEditForm: FormGroup;
  validate_group_name: any;

  // parent component
  @Output() messageEvent = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private menuSrv: MenuService,
    private userGroupSrv: UserGroupService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getMenus();
  }

  fillForm(group_id)
  {
    this.my_page_access = [];

    this.userGroupSrv.getAll({group_id: group_id}).subscribe(res => {
      if( res['data'].groups != null )
      {
        res['data'].my_page_access.forEach((o, i) => {
          if(o.can_access == "Y"){
            this.my_page_access.push( o.menu_id );
          }          
        });

        this.groupUserEditForm.controls['page_access'] = new FormArray([]);
        this.menus.forEach((om, im) => {

          var control = new FormControl( ( this.my_page_access.indexOf(om['menu_id']) != -1 ) );
          (this.groupUserEditForm.controls['page_access'] as FormArray).push(control);

        });

        this.groupUserEditForm.patchValue(res['data'].groups[0]);
        $("#modal-user-group-edit").modal("show");
      }
    });
  }

  getMenus()
  {
    this.menuSrv.getForPageAccess().subscribe(res => {
      this.menus = res['data'].menus;
    });
  }

  createForm()
  {
    this.groupUserEditForm = this.fb.group({
      group_id: ['', Validators.required],
      group_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)], this.validateGroupNameDuplicat.bind(this)],
      is_active: ['Y', [Validators.required]],
      page_access: new FormArray([])
    });
  }

  validateGroupNameDuplicat(control: FormControl): any
  {
    return new Promise(resolve => {

      clearTimeout(this.validate_group_name);

      this.validate_group_name = setTimeout(() => {

        var gid = this.groupUserEditForm.controls['group_id'].value;
        this.userGroupSrv.checkGroupNameDuplicat(control.value, 'edit', gid).subscribe(res => {
          if( res['ok'] )
          {
            resolve(null);
          }else{
            resolve({'duplicat_group_name': true});
          }
        });

      }, 500);
    });
  }

  updateGroupUser()
  {
    var new_my_page_access = [];
    var page_access = this.groupUserEditForm.controls['page_access'].value;
    page_access.forEach((o, i) => {
      if(o != false){
        new_my_page_access.push( this.menus[i]['menu_id'] );
      }
    });

    this.userGroupSrv.update(this.groupUserEditForm.value, new_my_page_access).subscribe(res => {
      this.groupUserEditForm.controls['group_name'].setValue('');
      this.messageEvent.emit('refresh_data');
      $('.toast').toast('show');

      $(this.modal_id).modal('hide');
    });
  }

}
