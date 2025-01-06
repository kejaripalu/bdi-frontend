import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PphppmComponent } from './pphppm.component';

describe('PphppmComponent', () => {
  let component: PphppmComponent;
  let fixture: ComponentFixture<PphppmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PphppmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PphppmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
