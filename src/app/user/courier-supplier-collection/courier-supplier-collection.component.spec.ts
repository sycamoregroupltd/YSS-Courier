import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourierSupplierCollectionComponent } from './courier-supplier-collection.component';

describe('CourierSupplierCollectionComponent', () => {
  let component: CourierSupplierCollectionComponent;
  let fixture: ComponentFixture<CourierSupplierCollectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierSupplierCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierSupplierCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
