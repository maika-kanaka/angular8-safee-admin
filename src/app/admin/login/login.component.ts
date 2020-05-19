import { Component, OnInit, Renderer2  } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'bg-dark');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'bg-dark');
  }

}
