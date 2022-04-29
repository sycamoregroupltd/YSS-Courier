import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierVehicleComponent } from './courier-vehicle.component';

describe('CourierVehicleComponent', () => {
  let component: CourierVehicleComponent;
  let fixture: ComponentFixture<CourierVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
