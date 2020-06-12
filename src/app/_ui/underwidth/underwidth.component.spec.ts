import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwidthComponent } from './underwidth.component';

describe('UnderwidthComponent', () => {
  let component: UnderwidthComponent;
  let fixture: ComponentFixture<UnderwidthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderwidthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderwidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
