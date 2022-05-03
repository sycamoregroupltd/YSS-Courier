import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountShipmentOverviewComponent } from './account-shipment-overview.component';

describe('AccountShipmentOverviewComponent', () => {
  let component: AccountShipmentOverviewComponent;
  let fixture: ComponentFixture<AccountShipmentOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountShipmentOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountShipmentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
