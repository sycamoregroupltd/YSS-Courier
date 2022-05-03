import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RatingIconsComponent } from './rating-icons.component';

describe('RatingIconsComponent', () => {
  let component: RatingIconsComponent;
  let fixture: ComponentFixture<RatingIconsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
