import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShipmentsBoardComponent } from './shipments-board.component';

describe('ShipmentsBoardComponent', () => {
  let component: ShipmentsBoardComponent;
  let fixture: ComponentFixture<ShipmentsBoardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
