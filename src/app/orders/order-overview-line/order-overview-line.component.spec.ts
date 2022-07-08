import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOverviewLineComponent } from './order-overview-line.component';

describe('OrderOverviewLineComponent', () => {
  let component: OrderOverviewLineComponent;
  let fixture: ComponentFixture<OrderOverviewLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderOverviewLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOverviewLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
