import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourierVehicleComponent } from './courier-vehicle.component';

describe('CourierVehicleComponent', () => {
  let component: CourierVehicleComponent;
  let fixture: ComponentFixture<CourierVehicleComponent>;

  beforeEach(waitForAsync(() => {
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
