import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsinDetailComponent } from './opsin-detail.component';

describe('OpsinDetailComponent', () => {
  let component: OpsinDetailComponent;
  let fixture: ComponentFixture<OpsinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsinDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
