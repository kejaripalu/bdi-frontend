import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratKeluarHelpComponent } from './surat-keluar-help.component';

describe('SuratKeluarHelpComponent', () => {
  let component: SuratKeluarHelpComponent;
  let fixture: ComponentFixture<SuratKeluarHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratKeluarHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuratKeluarHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
