import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LahinComponent } from './lahin.component';

describe('LahinComponent', () => {
  let component: LahinComponent;
  let fixture: ComponentFixture<LahinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LahinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LahinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
