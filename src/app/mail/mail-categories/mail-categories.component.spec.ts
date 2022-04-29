import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailCategoriesComponent } from './mail-categories.component';

describe('MailCategoriesComponent', () => {
  let component: MailCategoriesComponent;
  let fixture: ComponentFixture<MailCategoriesComponent>;

  beforeEach(async(() => {
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
