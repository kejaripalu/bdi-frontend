import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdinFormComponent } from './prodin-form.component';

describe('ProdinFormComponent', () => {
  let component: ProdinFormComponent;
  let fixture: ComponentFixture<ProdinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdinFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
