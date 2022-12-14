import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KegiatanDetailComponent } from './kegiatan-detail.component';

describe('KegiatanDetailComponent', () => {
  let component: KegiatanDetailComponent;
  let fixture: ComponentFixture<KegiatanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KegiatanDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KegiatanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
