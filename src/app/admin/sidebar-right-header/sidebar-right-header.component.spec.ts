import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRightHeaderComponent } from './sidebar-right-header.component';

describe('SidebarRightHeaderComponent', () => {
  let component: SidebarRightHeaderComponent;
  let fixture: ComponentFixture<SidebarRightHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRightHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRightHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
