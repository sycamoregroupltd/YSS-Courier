import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTradeComponent } from './dashboard-trade.component';

describe('DashboardTradeComponent', () => {
  let component: DashboardTradeComponent;
  let fixture: ComponentFixture<DashboardTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
