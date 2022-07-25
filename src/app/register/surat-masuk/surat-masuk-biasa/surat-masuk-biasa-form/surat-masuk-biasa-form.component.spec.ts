import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratMasukBiasaFormComponent } from './surat-masuk-biasa-form.component';

describe('SuratMasukBiasaFormComponent', () => {
  let component: SuratMasukBiasaFormComponent;
  let fixture: ComponentFixture<SuratMasukBiasaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratMasukBiasaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuratMasukBiasaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
