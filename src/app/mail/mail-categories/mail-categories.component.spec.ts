import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MailCategoriesComponent } from './mail-categories.component';

describe('MailCategoriesComponent', () => {
  let component: MailCategoriesComponent;
  let fixture: ComponentFixture<MailCategoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MailCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
