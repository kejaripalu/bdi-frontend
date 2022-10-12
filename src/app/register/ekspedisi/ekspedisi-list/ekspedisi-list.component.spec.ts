import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkspedisiListComponent } from './ekspedisi-list.component';

describe('EkspedisiListComponent', () => {
  let component: EkspedisiListComponent;
  let fixture: ComponentFixture<EkspedisiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EkspedisiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EkspedisiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
