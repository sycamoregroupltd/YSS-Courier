import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerMenuComponent } from './customer-menu.component';

describe('CustomerMenuComponent', () => {
  let component: CustomerMenuComponent;
  let fixture: ComponentFixture<CustomerMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
