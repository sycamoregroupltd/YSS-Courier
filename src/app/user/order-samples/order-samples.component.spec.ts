import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderSamplesComponent } from './order-samples.component';

describe('OrderSamplesComponent', () => {
  let component: OrderSamplesComponent;
  let fixture: ComponentFixture<OrderSamplesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
