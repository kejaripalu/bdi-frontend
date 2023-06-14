import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KegiatanPamstraHelpComponent } from './kegiatan-pamstra-help.component';

describe('KegiatanPamstraHelpComponent', () => {
  let component: KegiatanPamstraHelpComponent;
  let fixture: ComponentFixture<KegiatanPamstraHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KegiatanPamstraHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KegiatanPamstraHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
