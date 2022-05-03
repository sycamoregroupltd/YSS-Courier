import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourierDeliveryZonePostcodesComponent } from './courier-delivery-zone-postcodes.component';

describe('CourierDeliveryZonePostcodesComponent', () => {
  let component: CourierDeliveryZonePostcodesComponent;
  let fixture: ComponentFixture<CourierDeliveryZonePostcodesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierDeliveryZonePostcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierDeliveryZonePostcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
