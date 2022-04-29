import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsSummaryComponent } from './rewards-summary.component';

describe('RewardsSummaryComponent', () => {
  let component: RewardsSummaryComponent;
  let fixture: ComponentFixture<RewardsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
