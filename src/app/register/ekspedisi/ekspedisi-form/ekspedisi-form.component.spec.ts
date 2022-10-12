import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkspedisiFormComponent } from './ekspedisi-form.component';

describe('EkspedisiFormComponent', () => {
  let component: EkspedisiFormComponent;
  let fixture: ComponentFixture<EkspedisiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EkspedisiFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EkspedisiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
