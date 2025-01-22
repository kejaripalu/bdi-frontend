import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkumluhkumComponent } from './penkumluhkum.component';

describe('PenkumluhkumComponent', () => {
  let component: PenkumluhkumComponent;
  let fixture: ComponentFixture<PenkumluhkumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkumluhkumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkumluhkumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
