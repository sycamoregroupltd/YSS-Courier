import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompanyMenuComponent } from './company-menu.component';

describe('CompanyMenuComponent', () => {
  let component: CompanyMenuComponent;
  let fixture: ComponentFixture<CompanyMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
