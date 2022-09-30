import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratKeluarDetailComponent } from './surat-keluar-detail.component';

describe('SuratKeluarDetailComponent', () => {
  let component: SuratKeluarDetailComponent;
  let fixture: ComponentFixture<SuratKeluarDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratKeluarDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuratKeluarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
