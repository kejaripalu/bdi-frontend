import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratMasukComponent } from './surat-masuk.component';

describe('SuratMasukComponent', () => {
  let component: SuratMasukComponent;
  let fixture: ComponentFixture<SuratMasukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratMasukComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuratMasukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
