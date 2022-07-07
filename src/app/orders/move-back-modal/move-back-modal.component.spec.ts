import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveBackModalComponent } from './move-back-modal.component';

describe('MoveBackModalComponent', () => {
  let component: MoveBackModalComponent;
  let fixture: ComponentFixture<MoveBackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveBackModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveBackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
