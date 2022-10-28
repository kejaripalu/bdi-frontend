import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsipDetailComponent } from './arsip-detail.component';

describe('ArsipDetailComponent', () => {
  let component: ArsipDetailComponent;
  let fixture: ComponentFixture<ArsipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArsipDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArsipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
