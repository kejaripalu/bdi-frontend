import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkumluhkumHelpComponent } from './penkumluhkum-help.component';

describe('PenkumluhkumHelpComponent', () => {
  let component: PenkumluhkumHelpComponent;
  let fixture: ComponentFixture<PenkumluhkumHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkumluhkumHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkumluhkumHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
