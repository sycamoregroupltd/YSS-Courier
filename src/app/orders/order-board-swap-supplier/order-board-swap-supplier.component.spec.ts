import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBoardSwapSupplierComponent } from './order-board-swap-supplier.component';

describe('OrderBoardSwapSupplierComponent', () => {
  let component: OrderBoardSwapSupplierComponent;
  let fixture: ComponentFixture<OrderBoardSwapSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBoardSwapSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBoardSwapSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
