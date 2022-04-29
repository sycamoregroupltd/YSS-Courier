import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCourierComponent } from './dashboard-courier.component';

describe('DashboardCourierComponent', () => {
  let component: DashboardCourierComponent;
  let fixture: ComponentFixture<DashboardCourierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCourierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
