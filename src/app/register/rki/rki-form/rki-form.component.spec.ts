import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RkiFormComponent } from './rki-form.component';

describe('RkiFormComponent', () => {
  let component: RkiFormComponent;
  let fixture: ComponentFixture<RkiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RkiFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RkiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
