import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterIpadComponent } from './footer-ipad.component';

describe('FooterIpadComponent', () => {
  let component: FooterIpadComponent;
  let fixture: ComponentFixture<FooterIpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterIpadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterIpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
