import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSetConfirmationComponent } from './password-set-confirmation.component';

describe('PasswordSetConfirmationComponent', () => {
  let component: PasswordSetConfirmationComponent;
  let fixture: ComponentFixture<PasswordSetConfirmationComponent>;

  beforeEach(async(() => {
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
