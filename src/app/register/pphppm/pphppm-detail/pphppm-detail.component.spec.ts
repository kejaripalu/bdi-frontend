import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PphppmDetailComponent } from './pphppm-detail.component';

describe('PphppmDetailComponent', () => {
  let component: PphppmDetailComponent;
  let fixture: ComponentFixture<PphppmDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PphppmDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PphppmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
