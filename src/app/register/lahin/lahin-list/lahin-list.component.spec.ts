import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LahinListComponent } from './lahin-list.component';

describe('LahinListComponent', () => {
  let component: LahinListComponent;
  let fixture: ComponentFixture<LahinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LahinListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LahinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
