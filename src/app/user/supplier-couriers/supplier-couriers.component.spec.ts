import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplierCouriersComponent } from './supplier-couriers.component';

describe('SupplierCouriersComponent', () => {
  let component: SupplierCouriersComponent;
  let fixture: ComponentFixture<SupplierCouriersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierCouriersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCouriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
