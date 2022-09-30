import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratKeluarFormComponent } from './surat-keluar-form.component';

describe('SuratKeluarFormComponent', () => {
  let component: SuratKeluarFormComponent;
  let fixture: ComponentFixture<SuratKeluarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratKeluarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuratKeluarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
