import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratMasukHelpComponent } from './surat-masuk-help.component';

describe('SuratMasukHelpComponent', () => {
  let component: SuratMasukHelpComponent;
  let fixture: ComponentFixture<SuratMasukHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratMasukHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuratMasukHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
