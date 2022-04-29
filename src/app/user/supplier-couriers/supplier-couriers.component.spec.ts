import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCouriersComponent } from './supplier-couriers.component';

describe('SupplierCouriersComponent', () => {
  let component: SupplierCouriersComponent;
  let fixture: ComponentFixture<SupplierCouriersComponent>;

  beforeEach(async(() => {
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
