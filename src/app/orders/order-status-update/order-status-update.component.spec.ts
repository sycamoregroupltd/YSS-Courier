import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderStatusUpdateComponent } from './order-status-update.component';

describe('OrderStatusUpdateComponent', () => {
  let component: OrderStatusUpdateComponent;
  let fixture: ComponentFixture<OrderStatusUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
