import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratMasukListComponent } from './surat-masuk-biasa.component';

describe('SuratMasukListComponent', () => {
  let component: SuratMasukListComponent;
  let fixture: ComponentFixture<SuratMasukListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratMasukListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuratMasukListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
