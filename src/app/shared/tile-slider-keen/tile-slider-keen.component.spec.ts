import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileSliderKeenComponent } from './tile-slider-keen.component';

describe('TileSliderKeenComponent', () => {
  let component: TileSliderKeenComponent;
  let fixture: ComponentFixture<TileSliderKeenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileSliderKeenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileSliderKeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
