import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratMasukFormComponent } from './surat-masuk-form.component';

describe('SuratMasukFormComponent', () => {
  let component: SuratMasukFormComponent;
  let fixture: ComponentFixture<SuratMasukFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuratMasukFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuratMasukFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
