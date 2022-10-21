import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdinHelpComponent } from './prodin-help.component';

describe('ProdinHelpComponent', () => {
  let component: ProdinHelpComponent;
  let fixture: ComponentFixture<ProdinHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdinHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdinHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
