import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkumluhkumListComponent } from './penkumluhkum-list.component';

describe('PenkumluhkumListComponent', () => {
  let component: PenkumluhkumListComponent;
  let fixture: ComponentFixture<PenkumluhkumListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkumluhkumListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkumluhkumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
