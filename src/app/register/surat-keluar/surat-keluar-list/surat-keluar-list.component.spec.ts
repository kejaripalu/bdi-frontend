import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratKeluarListComponent } from './surat-keluar-list.component';

describe('SuratKeluarListComponent', () => {
  let component: SuratKeluarListComponent;
  let fixture: ComponentFixture<SuratKeluarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratKeluarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuratKeluarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
