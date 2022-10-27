import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsipComponent } from './arsip.component';

describe('ArsipComponent', () => {
  let component: ArsipComponent;
  let fixture: ComponentFixture<ArsipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArsipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArsipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
