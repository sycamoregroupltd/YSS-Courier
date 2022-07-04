import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOverviewModalComponent } from './order-overview-modal.component';

describe('OrderOverviewModalComponent', () => {
  let component: OrderOverviewModalComponent;
  let fixture: ComponentFixture<OrderOverviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderOverviewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOverviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
