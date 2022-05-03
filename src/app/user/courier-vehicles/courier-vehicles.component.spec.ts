import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourierVehiclesComponent } from './courier-vehicles.component';

describe('CourierVehiclesComponent', () => {
  let component: CourierVehiclesComponent;
  let fixture: ComponentFixture<CourierVehiclesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
