import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingSpinnerComponent } from './floating-spinner.component';

describe('FloatingSpinnerComponent', () => {
  let component: FloatingSpinnerComponent;
  let fixture: ComponentFixture<FloatingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
