import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KegiatanPamstraFormComponent } from './kegiatan-pamstra-form.component';

describe('KegiatanPamstraFormComponent', () => {
  let component: KegiatanPamstraFormComponent;
  let fixture: ComponentFixture<KegiatanPamstraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KegiatanPamstraFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KegiatanPamstraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
