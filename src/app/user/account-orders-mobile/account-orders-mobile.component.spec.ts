import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountOrdersMobileComponent } from './account-orders-mobile.component';

describe('AccountOrdersMobileComponent', () => {
  let component: AccountOrdersMobileComponent;
  let fixture: ComponentFixture<AccountOrdersMobileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOrdersMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOrdersMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
