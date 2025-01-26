import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkumluhkumDetailComponent } from './penkumluhkum-detail.component';

describe('PenkumluhkumDetailComponent', () => {
  let component: PenkumluhkumDetailComponent;
  let fixture: ComponentFixture<PenkumluhkumDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkumluhkumDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkumluhkumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
