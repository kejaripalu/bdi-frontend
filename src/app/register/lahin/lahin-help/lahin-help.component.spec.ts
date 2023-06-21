import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LahinHelpComponent } from './lahin-help.component';

describe('LahinHelpComponent', () => {
  let component: LahinHelpComponent;
  let fixture: ComponentFixture<LahinHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LahinHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LahinHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
