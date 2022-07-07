import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvNumberComponent } from './add-inv-number.component';

describe('AddInvNumberComponent', () => {
  let component: AddInvNumberComponent;
  let fixture: ComponentFixture<AddInvNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInvNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
