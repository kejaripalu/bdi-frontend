import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KegiatanListComponent } from './kegiatan-list.component';

describe('KegiatanListComponent', () => {
  let component: KegiatanListComponent;
  let fixture: ComponentFixture<KegiatanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KegiatanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KegiatanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
