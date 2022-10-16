import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdinListComponent } from './prodin-list.component';

describe('ProdinListComponent', () => {
  let component: ProdinListComponent;
  let fixture: ComponentFixture<ProdinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdinListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
