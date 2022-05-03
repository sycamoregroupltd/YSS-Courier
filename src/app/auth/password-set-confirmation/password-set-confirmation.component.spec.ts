import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PasswordSetConfirmationComponent } from './password-set-confirmation.component';

describe('PasswordSetConfirmationComponent', () => {
  let component: PasswordSetConfirmationComponent;
  let fixture: ComponentFixture<PasswordSetConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordSetConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordSetConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
