import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RkiDetailComponent } from './rki-detail.component';

describe('RkiDetailComponent', () => {
  let component: RkiDetailComponent;
  let fixture: ComponentFixture<RkiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RkiDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RkiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
