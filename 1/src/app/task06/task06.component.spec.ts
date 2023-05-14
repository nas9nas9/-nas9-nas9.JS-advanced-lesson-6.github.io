import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task06Component } from './task06.component';

describe('Task06Component', () => {
  let component: Task06Component;
  let fixture: ComponentFixture<Task06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Task06Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Task06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
