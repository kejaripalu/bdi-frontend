import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PphppmListComponent } from './pphppm-list.component';

describe('PphppmListComponent', () => {
  let component: PphppmListComponent;
  let fixture: ComponentFixture<PphppmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PphppmListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PphppmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
