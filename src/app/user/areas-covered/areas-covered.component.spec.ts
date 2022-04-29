import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasCoveredComponent } from './areas-covered.component';

describe('AreasCoveredComponent', () => {
  let component: AreasCoveredComponent;
  let fixture: ComponentFixture<AreasCoveredComponent>;

  beforeEach(async(() => {
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
