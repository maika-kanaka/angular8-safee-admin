import { Component, OnInit, Renderer2  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private renderer: Renderer2, private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'bg-dark');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'bg-dark');
  }

}
