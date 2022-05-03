import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompanyAreaManageComponent } from './company-area-manage.component';

describe('CompanyAreaManageComponent', () => {
  let component: CompanyAreaManageComponent;
  let fixture: ComponentFixture<CompanyAreaManageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAreaManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAreaManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
