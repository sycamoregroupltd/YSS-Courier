import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUserEditComponent } from './account-user-edit.component';

describe('AccountUserEditComponent', () => {
  let component: AccountUserEditComponent;
  let fixture: ComponentFixture<AccountUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
