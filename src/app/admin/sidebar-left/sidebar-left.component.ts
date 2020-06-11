import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_helpers/auth.service';

@Component({
  selector: '[app-sidebar-left]',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent implements OnInit {

  constructor(private authSrv: AuthService) { }

  ngOnInit() {
  }

  ngAfterContentInit()
  {
    $('#menuToggle').on('click', function(event) {
      $('body').toggleClass('open');
    });
  }

}
