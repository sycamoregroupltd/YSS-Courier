import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailSearchComponent } from './order-detail-search.component';

describe('OrderDetailSearchComponent', () => {
  let component: OrderDetailSearchComponent;
  let fixture: ComponentFixture<OrderDetailSearchComponent>;

  beforeEach(async(() => {
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
