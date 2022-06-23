import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBoardPopupComponent } from './order-board-popup.component';

describe('OrderBoardPopupComponent', () => {
  let component: OrderBoardPopupComponent;
  let fixture: ComponentFixture<OrderBoardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBoardPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBoardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
