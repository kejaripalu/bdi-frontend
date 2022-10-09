import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RkiHelpComponent } from './rki-help.component';

describe('RkiHelpComponent', () => {
  let component: RkiHelpComponent;
  let fixture: ComponentFixture<RkiHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RkiHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RkiHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
