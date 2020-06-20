import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/_services/setting/user.service';
import { AuthService } from 'src/app/_helpers/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { resolve } from 'url';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  static menu_id: string = 'my_profile';
  public user: User = {
    user_fullname: '',
    user_name: '',
    user_email: '',
    is_active: ''
  };
  public profileForm: FormGroup;
  public authForm: FormGroup;

  public validate_user_name: any;
  public validate_user_email: any;

  constructor(
    private userSrv: UserService, 
    private authSrv: AuthService,
    private fb: FormBuilder
  ) { 

  }

  ngAfterContentInit()
  {
    $('.toast').toast({
      delay: 3000
    });
  }

  ngOnInit() 
  {
    this.getUser();
    this.createForm();
  }

  getUser()
  {
    this.userSrv.getAll({user_id: this.authSrv.currentUser().user_id}).subscribe(res => {
      if(res['data'].users !== null){
        this.user = res['data'].users[0];

        this.profileForm.patchValue(this.user);
      }
    }); 
  }

  createForm()
  {
    this.profileForm = this.fb.group({
      user_fullname: [, [Validators.required, Validators.minLength(4), Validators.maxLength(160)]],
      user_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)], this.validateUsernameDuplicat.bind(this)],
      user_email: ['', [Validators.required, Validators.email], this.validateEmailDuplicat.bind(this)]
    });

    this.authForm = this.fb.group({
      user_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['']
    }, {validator: this.validAuth});
  }

  validateUsernameDuplicat(control: FormControl): any
  {
    return new Promise(resolve => {

      clearTimeout(this.validate_user_name);

      this.validate_user_name = setTimeout(() => {

        this.userSrv.checkUsernameDuplicat(control.value, 'profile').subscribe(res => {
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

        this.userSrv.checkEmailDuplicat(control.value, 'profile').subscribe(res => {
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

  updateProfile()
  {
    this.userSrv.profileUpdate(this.profileForm.value).subscribe(res => {
      this.getUser();
      $('.toast').toast('show');
    });
  }








  validAuth(group: FormGroup)
  {
    let pass = group.get('user_password').value;
    let confirmPass = group.get('confirm_password').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  updateAuth()
  {
    this.userSrv.profileUpdate(this.authForm.value).subscribe(res => {
      this.authForm.reset();
      $('.toast').toast('show');
    });
  }

}
