import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KegiatanHelpComponent } from './kegiatan-help.component';

describe('KegiatanHelpComponent', () => {
  let component: KegiatanHelpComponent;
  let fixture: ComponentFixture<KegiatanHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KegiatanHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KegiatanHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
