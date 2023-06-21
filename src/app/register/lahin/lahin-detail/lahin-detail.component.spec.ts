import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LahinDetailComponent } from './lahin-detail.component';

describe('LahinDetailComponent', () => {
  let component: LahinDetailComponent;
  let fixture: ComponentFixture<LahinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LahinDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LahinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
