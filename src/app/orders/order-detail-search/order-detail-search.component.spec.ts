import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderDetailSearchComponent } from './order-detail-search.component';

describe('OrderDetailSearchComponent', () => {
  let component: OrderDetailSearchComponent;
  let fixture: ComponentFixture<OrderDetailSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
