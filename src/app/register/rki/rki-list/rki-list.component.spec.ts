import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RkiListComponent } from './rki-list.component';

describe('RkiListComponent', () => {
  let component: RkiListComponent;
  let fixture: ComponentFixture<RkiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RkiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RkiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
