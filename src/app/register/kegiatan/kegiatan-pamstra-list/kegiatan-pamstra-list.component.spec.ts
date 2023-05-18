import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KegiatanPamstraListComponent } from './kegiatan-pamstra-list.component';

describe('KegiatanPamstraListComponent', () => {
  let component: KegiatanPamstraListComponent;
  let fixture: ComponentFixture<KegiatanPamstraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KegiatanPamstraListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KegiatanPamstraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
