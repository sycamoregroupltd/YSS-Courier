import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardEmailInviteComponent } from './reward-email-invite.component';

describe('RewardEmailInviteComponent', () => {
  let component: RewardEmailInviteComponent;
  let fixture: ComponentFixture<RewardEmailInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardEmailInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardEmailInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
