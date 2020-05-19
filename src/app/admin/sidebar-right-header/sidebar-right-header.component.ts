import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-right-header',
  templateUrl: './sidebar-right-header.component.html',
  styleUrls: ['./sidebar-right-header.component.scss']
})
export class SidebarRightHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit()
  {
    $('.search-trigger').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $('.search-trigger').parent('.header-left').addClass('open');
    });
  
    $('.search-close').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $('.search-trigger').parent('.header-left').removeClass('open');
    });
  }

}
