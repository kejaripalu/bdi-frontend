import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdinDetailComponent } from './prodin-detail.component';

describe('ProdinDetailComponent', () => {
  let component: ProdinDetailComponent;
  let fixture: ComponentFixture<ProdinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdinDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
