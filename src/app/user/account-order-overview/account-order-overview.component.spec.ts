import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderOverviewComponent } from './account-order-overview.component';

describe('AccountOrderOverviewComponent', () => {
  let component: AccountOrderOverviewComponent;
  let fixture: ComponentFixture<AccountOrderOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOrderOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOrderOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
