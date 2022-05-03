import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourierOverviewComponent } from './courier-overview.component';

describe('CourierOverviewComponent', () => {
  let component: CourierOverviewComponent;
  let fixture: ComponentFixture<CourierOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
