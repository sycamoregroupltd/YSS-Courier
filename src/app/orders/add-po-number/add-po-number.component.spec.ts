import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoNumberComponent } from './add-po-number.component';

describe('AddPoNumberComponent', () => {
  let component: AddPoNumberComponent;
  let fixture: ComponentFixture<AddPoNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPoNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPoNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
