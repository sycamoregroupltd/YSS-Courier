import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourierDeliveryZonesComponent } from './courier-delivery-zones.component';

describe('CourierDeliveryZonesComponent', () => {
  let component: CourierDeliveryZonesComponent;
  let fixture: ComponentFixture<CourierDeliveryZonesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierDeliveryZonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierDeliveryZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
