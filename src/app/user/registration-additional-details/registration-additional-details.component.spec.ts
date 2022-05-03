import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationAdditionalDetailsComponent } from './registration-additional-details.component';

describe('RegistrationAdditionalDetailsComponent', () => {
  let component: RegistrationAdditionalDetailsComponent;
  let fixture: ComponentFixture<RegistrationAdditionalDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAdditionalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAdditionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
