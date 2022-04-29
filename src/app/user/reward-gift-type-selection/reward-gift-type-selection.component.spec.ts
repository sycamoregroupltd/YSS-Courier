import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardGiftTypeSelectionComponent } from './reward-gift-type-selection.component';

describe('RewardGiftTypeSelectionComponent', () => {
  let component: RewardGiftTypeSelectionComponent;
  let fixture: ComponentFixture<RewardGiftTypeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardGiftTypeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardGiftTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
