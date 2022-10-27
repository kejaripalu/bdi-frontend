import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsipListComponent } from './arsip-list.component';

describe('ArsipListComponent', () => {
  let component: ArsipListComponent;
  let fixture: ComponentFixture<ArsipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArsipListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArsipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
