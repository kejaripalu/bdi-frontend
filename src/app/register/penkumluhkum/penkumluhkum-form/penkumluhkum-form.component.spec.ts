import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkumluhkumFormComponent } from './penkumluhkum-form.component';

describe('PenkumluhkumFormComponent', () => {
  let component: PenkumluhkumFormComponent;
  let fixture: ComponentFixture<PenkumluhkumFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkumluhkumFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkumluhkumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
