import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LahinFormComponent } from './lahin-form.component';

describe('LahinFormComponent', () => {
  let component: LahinFormComponent;
  let fixture: ComponentFixture<LahinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LahinFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LahinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
