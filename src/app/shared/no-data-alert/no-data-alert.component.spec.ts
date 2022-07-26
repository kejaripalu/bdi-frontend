import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataAlertComponent } from './no-data-alert.component';

describe('NoDataAlertComponent', () => {
  let component: NoDataAlertComponent;
  let fixture: ComponentFixture<NoDataAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoDataAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDataAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
