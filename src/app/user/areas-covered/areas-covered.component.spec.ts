import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AreasCoveredComponent } from './areas-covered.component';

describe('AreasCoveredComponent', () => {
  let component: AreasCoveredComponent;
  let fixture: ComponentFixture<AreasCoveredComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasCoveredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasCoveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
