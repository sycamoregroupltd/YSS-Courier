import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MailUserSearchComponent } from './mail-user-search.component';

describe('MailUserSearchComponent', () => {
  let component: MailUserSearchComponent;
  let fixture: ComponentFixture<MailUserSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MailUserSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailUserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
