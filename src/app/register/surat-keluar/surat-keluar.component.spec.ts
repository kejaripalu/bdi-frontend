import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratKeluarComponent } from './surat-keluar.component';

describe('SuratKeluarComponent', () => {
  let component: SuratKeluarComponent;
  let fixture: ComponentFixture<SuratKeluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratKeluarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuratKeluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
