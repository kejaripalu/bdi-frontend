import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsipFormComponent } from './arsip-form.component';

describe('ArsipFormComponent', () => {
  let component: ArsipFormComponent;
  let fixture: ComponentFixture<ArsipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArsipFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArsipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
