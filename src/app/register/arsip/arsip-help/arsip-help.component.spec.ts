import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsipHelpComponent } from './arsip-help.component';

describe('ArsipHelpComponent', () => {
  let component: ArsipHelpComponent;
  let fixture: ComponentFixture<ArsipHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArsipHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArsipHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
