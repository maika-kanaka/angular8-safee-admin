import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/_services/setting/user.service';
import { GroupService } from 'src/app/_services/setting/group.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userEditForm: FormGroup;
  groups: [];

  public validate_user_name: any;
  public validate_user_email: any;

  constructor(
    private fb: FormBuilder,
    private userSrv: UserService,
    private groupSrv: GroupService
  ) { }

  ngOnInit() 
  {
    this.createEditForm();
    
    this.groupSrv.getAll({'is_active': 'Y'}).subscribe(res => {
      if(res['errors'] == null){
        this.groups = res['data'].groups;
      }
    });
  }

  fillForm(user_id)
  {
    this.userSrv.getAll({user_id: user_id}).subscribe(res => {
      if( res['data'].users != null )
      {
        this.userEditForm.patchValue(res['data'].users[0]);
        $("#modal-user-edit").modal("show");
      }
    });
  }

  createEditForm()
  {
    this.userEditForm = this.fb.group({
      user_id: ['', [Validators.required]],
      group_id: ['', [Validators.required]],
      user_fullname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(160)]],
      user_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)], this.validateUsernameDuplicat.bind(this)],
      user_email: ['', [Validators.required, Validators.email], this.validateEmailDuplicat.bind(this)],
      user_password: ['', [Validators.minLength(6)]],
      confirm_password: [''],
      is_block: ['N']
    }, {validators: this.validConfirmPassword});
  }

  validConfirmPassword(group: FormGroup): any
  {
    let pass = group.get('user_password').value;
    let confirmPass = group.get('confirm_password').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  validateUsernameDuplicat(control: FormControl): any
  {
    return new Promise(resolve => {

      clearTimeout(this.validate_user_name);

      this.validate_user_name = setTimeout(() => {

        var uid = this.userEditForm.controls['user_id'].value;
        this.userSrv.checkUsernameDuplicat(control.value, 'edit', uid).subscribe(res => {
          if( res['ok'] )
          {
            resolve(null);
          }else{
            resolve({'duplicat_username': true});
          }
        });

      }, 500);
    });
  }

  validateEmailDuplicat(control: FormControl): any
  {
    return new Promise(resolve => {
      
      clearTimeout(this.validate_user_email);

      this.validate_user_email = setTimeout(() => {

        var uid = this.userEditForm.controls['user_id'].value;
        this.userSrv.checkEmailDuplicat(control.value, 'edit', uid).subscribe(res => {
          if( res['ok'] )
          {
            resolve(null);
          }else{
            resolve({'duplicat_user_email': true});
          }
        });

      }, 500);
    });
  }

  updateUser()
  {
    this.userSrv.update(this.userEditForm.value).subscribe(res => {
      $('.toast').toast('show');
      this.userEditForm.reset();
    });
  }


}
