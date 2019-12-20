import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfifyTaskComponent } from './verfify-task.component';

describe('VerfifyTaskComponent', () => {
  let component: VerfifyTaskComponent;
  let fixture: ComponentFixture<VerfifyTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerfifyTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerfifyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
