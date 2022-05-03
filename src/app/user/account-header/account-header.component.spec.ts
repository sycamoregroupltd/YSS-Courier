import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountHeaderComponent } from './account-header.component';

describe('AccountHeaderComponent', () => {
  let component: AccountHeaderComponent;
  let fixture: ComponentFixture<AccountHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
