import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MenuService } from 'src/app/_services/setting/menu.service';
import { UserGroupService } from 'src/app/_services/setting/user-group.service';

@Component({
  selector: 'app-user-group-add',
  templateUrl: './user-group-add.component.html',
  styleUrls: ['./user-group-add.component.scss']
})
export class UserGroupAddComponent implements OnInit {

  // property ui
  modal_id: string = '#modal-user-group-add';

  // property form
  menus: string[];
  groupUserForm: FormGroup;
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

  getMenus()
  {
    this.menuSrv.getForPageAccess().subscribe(res => {
      this.menus = res['data'].menus;

      for(var i = 0; i < this.menus.length; i++)
      {
        (this.groupUserForm.controls['page_access'] as FormArray).push(new FormControl(false));
      }
    });
  }

  createForm()
  {
    this.groupUserForm = this.fb.group({
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

        this.userGroupSrv.checkGroupNameDuplicat(control.value).subscribe(res => {
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

  saveGroupUser()
  {
    var new_my_page_access = [];
    var page_access = this.groupUserForm.controls['page_access'].value;
    page_access.forEach((o, i) => {
      if(o != false){
        new_my_page_access.push( this.menus[i]['menu_id'] );
      }
    });

    this.userGroupSrv.save(this.groupUserForm.value, new_my_page_access).subscribe(res => {
      this.groupUserForm.controls['group_name'].setValue('');
      this.messageEvent.emit('refresh_data');
      $('.toast').toast('show');

      $(this.modal_id).modal('hide');
    });
  }

}
