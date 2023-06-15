import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsinListComponent } from './opsin-list.component';

describe('OpsinListComponent', () => {
  let component: OpsinListComponent;
  let fixture: ComponentFixture<OpsinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsinListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
