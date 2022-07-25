import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratMasukRahasiaComponent } from './surat-masuk-rahasia.component';

describe('SuratMasukRahasiaComponent', () => {
  let component: SuratMasukRahasiaComponent;
  let fixture: ComponentFixture<SuratMasukRahasiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratMasukRahasiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuratMasukRahasiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
