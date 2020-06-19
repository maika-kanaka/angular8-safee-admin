import { Component, OnInit, Renderer2  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../_helpers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private route: Router,

    private authSrv: AuthService
  ) {
    this.createForm();

    if( localStorage.getItem("access_token") !== null ){
      this.route.navigate(['/admin/dashboard']);
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      email_or_username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  submitLogin() {
    this.authSrv.login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          result => this.route.navigate(['/admin/dashboard']),
          err => {
            this.error = "Kombinasi nama pengguna / email & kata sandi tidak benar.";
        });
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'bg-dark');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'bg-dark');
  }

}
