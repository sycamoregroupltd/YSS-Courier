import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsBoardComponent } from './shipments-board.component';

describe('ShipmentsBoardComponent', () => {
  let component: ShipmentsBoardComponent;
  let fixture: ComponentFixture<ShipmentsBoardComponent>;

  beforeEach(async(() => {
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
