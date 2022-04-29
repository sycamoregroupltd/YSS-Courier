import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailUserSearchComponent } from './mail-user-search.component';

describe('MailUserSearchComponent', () => {
  let component: MailUserSearchComponent;
  let fixture: ComponentFixture<MailUserSearchComponent>;

  beforeEach(async(() => {
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
