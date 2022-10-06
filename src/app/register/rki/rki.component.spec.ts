import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RkiComponent } from './rki.component';

describe('RkiComponent', () => {
  let component: RkiComponent;
  let fixture: ComponentFixture<RkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RkiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
