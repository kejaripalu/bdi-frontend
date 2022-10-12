import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkspedisiComponent } from './ekspedisi.component';

describe('EkspedisiComponent', () => {
  let component: EkspedisiComponent;
  let fixture: ComponentFixture<EkspedisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EkspedisiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EkspedisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
