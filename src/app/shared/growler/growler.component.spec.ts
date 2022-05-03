import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GrowlerComponent } from './growler.component';

describe('GrowlerComponent', () => {
  let component: GrowlerComponent;
  let fixture: ComponentFixture<GrowlerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
