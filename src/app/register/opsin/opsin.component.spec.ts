import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsinComponent } from './opsin.component';

describe('OpsinComponent', () => {
  let component: OpsinComponent;
  let fixture: ComponentFixture<OpsinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
