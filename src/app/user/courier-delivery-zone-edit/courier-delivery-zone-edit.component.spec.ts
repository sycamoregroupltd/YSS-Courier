import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDeliveryZoneEditComponent } from './courier-delivery-zone-edit.component';

describe('CourierDeliveryZoneEditComponent', () => {
  let component: CourierDeliveryZoneEditComponent;
  let fixture: ComponentFixture<CourierDeliveryZoneEditComponent>;

  beforeEach(async(() => {
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
