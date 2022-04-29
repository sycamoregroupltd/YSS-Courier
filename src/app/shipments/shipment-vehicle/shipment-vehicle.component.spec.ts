import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentVehicleComponent } from './shipment-vehicle.component';

describe('ShipmentVehicleComponent', () => {
  let component: ShipmentVehicleComponent;
  let fixture: ComponentFixture<ShipmentVehicleComponent>;

  beforeEach(async(() => {
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
