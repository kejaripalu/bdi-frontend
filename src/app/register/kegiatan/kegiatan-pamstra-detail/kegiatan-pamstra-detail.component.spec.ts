import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KegiatanPamstraDetailComponent } from './kegiatan-pamstra-detail.component';

describe('KegiatanPamstraDetailComponent', () => {
  let component: KegiatanPamstraDetailComponent;
  let fixture: ComponentFixture<KegiatanPamstraDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KegiatanPamstraDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KegiatanPamstraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
