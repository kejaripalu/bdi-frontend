import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsinFormComponent } from './opsin-form.component';

describe('OpsinFormComponent', () => {
  let component: OpsinFormComponent;
  let fixture: ComponentFixture<OpsinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsinFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
