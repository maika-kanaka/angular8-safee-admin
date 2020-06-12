import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/setting/user.service';
import { GroupService } from 'src/app/_services/setting/group.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userForm: FormGroup;
  groups: [];

  public validate_user_name: any;
  public validate_user_email: any;

  constructor(
    private fb: FormBuilder,
    private userSrv: UserService,
    private groupSrv: GroupService
  ) { }

  ngOnInit() {
    this.createAddForm();
    
    this.groupSrv.getAll({'is_active': 'Y'}).subscribe(res => {
      if(res['errors'] == null){
        this.groups = res['data'].groups;
      }
    });
  }

  createAddForm()
  {
    this.userForm = this.fb.group({
      group_id: ['', [Validators.required]],
      user_fullname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(160)]],
      user_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)], this.validateUsernameDuplicat.bind(this)],
      user_email: ['', [Validators.required, Validators.email], this.validateEmailDuplicat.bind(this)],
      user_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['']
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

        this.userSrv.checkUsernameDuplicat(control.value).subscribe(res => {
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

        this.userSrv.checkEmailDuplicat(control.value).subscribe(res => {
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

  saveUser()
  {
    
  }

}
