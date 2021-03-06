import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MailGroupsListComponent } from './mail-groups-list.component';

describe('MailGroupsListComponent', () => {
  let component: MailGroupsListComponent;
  let fixture: ComponentFixture<MailGroupsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MailGroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
