import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PphppmFormComponent } from './pphppm-form.component';

describe('PphppmFormComponent', () => {
  let component: PphppmFormComponent;
  let fixture: ComponentFixture<PphppmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PphppmFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PphppmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
