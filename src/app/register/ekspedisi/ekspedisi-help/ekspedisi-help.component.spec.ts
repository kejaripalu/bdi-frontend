import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkspedisiHelpComponent } from './ekspedisi-help.component';

describe('EkspedisiHelpComponent', () => {
  let component: EkspedisiHelpComponent;
  let fixture: ComponentFixture<EkspedisiHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EkspedisiHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EkspedisiHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
