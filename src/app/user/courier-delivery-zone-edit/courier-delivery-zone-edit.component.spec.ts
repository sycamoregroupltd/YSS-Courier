import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourierDeliveryZoneEditComponent } from './courier-delivery-zone-edit.component';

describe('CourierDeliveryZoneEditComponent', () => {
  let component: CourierDeliveryZoneEditComponent;
  let fixture: ComponentFixture<CourierDeliveryZoneEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierDeliveryZoneEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierDeliveryZoneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
