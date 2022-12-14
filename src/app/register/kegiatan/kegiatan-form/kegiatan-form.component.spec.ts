import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KegiatanFormComponent } from './kegiatan-form.component';

describe('KegiatanFormComponent', () => {
  let component: KegiatanFormComponent;
  let fixture: ComponentFixture<KegiatanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KegiatanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KegiatanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
