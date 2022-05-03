import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountOrdersComponent } from './account-orders.component';

describe('AccountOrdersComponent', () => {
  let component: AccountOrdersComponent;
  let fixture: ComponentFixture<AccountOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
