import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourierVehiclesSliderComponent } from './courier-vehicles-slider.component';

describe('CourierVehiclesSliderComponent', () => {
  let component: CourierVehiclesSliderComponent;
  let fixture: ComponentFixture<CourierVehiclesSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierVehiclesSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierVehiclesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
