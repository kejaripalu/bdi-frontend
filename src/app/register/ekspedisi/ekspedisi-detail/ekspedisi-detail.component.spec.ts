import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkspedisiDetailComponent } from './ekspedisi-detail.component';

describe('EkspedisiDetailComponent', () => {
  let component: EkspedisiDetailComponent;
  let fixture: ComponentFixture<EkspedisiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EkspedisiDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EkspedisiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
