import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdinComponent } from './prodin.component';

describe('ProdinComponent', () => {
  let component: ProdinComponent;
  let fixture: ComponentFixture<ProdinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
