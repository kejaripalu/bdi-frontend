import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratMasukDetailComponent } from './surat-masuk-detail.component';

describe('SuratMasukDetailComponent', () => {
  let component: SuratMasukDetailComponent;
  let fixture: ComponentFixture<SuratMasukDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratMasukDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuratMasukDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
