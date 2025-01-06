import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PphppmHelpComponent } from './pphppm-help.component';

describe('PphppmHelpComponent', () => {
  let component: PphppmHelpComponent;
  let fixture: ComponentFixture<PphppmHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PphppmHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PphppmHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
