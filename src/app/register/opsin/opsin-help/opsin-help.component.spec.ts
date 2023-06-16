import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsinHelpComponent } from './opsin-help.component';

describe('OpsinHelpComponent', () => {
  let component: OpsinHelpComponent;
  let fixture: ComponentFixture<OpsinHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsinHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsinHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
