import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShipmentVehicleComponent } from './shipment-vehicle.component';

describe('ShipmentVehicleComponent', () => {
  let component: ShipmentVehicleComponent;
  let fixture: ComponentFixture<ShipmentVehicleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
