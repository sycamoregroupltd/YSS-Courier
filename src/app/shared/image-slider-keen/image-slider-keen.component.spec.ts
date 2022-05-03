import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImageSliderKeenComponent } from './image-slider-keen.component';

describe('ImageSliderKeenComponent', () => {
  let component: ImageSliderKeenComponent;
  let fixture: ComponentFixture<ImageSliderKeenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSliderKeenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSliderKeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
