import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MailGroupsComponent } from './mail-groups.component';

describe('MailGroupsComponent', () => {
  let component: MailGroupsComponent;
  let fixture: ComponentFixture<MailGroupsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MailGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
